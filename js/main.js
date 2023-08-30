(() => {
  
  let yOffset = 0; // window.scrollY 담을 변수
  let prevScrollHeight = 0; // yoffset보다 이전에 위치한 스크롤 섹션들의 높이값의 합
  let currentScene = 0; // 현재 활성화 된 (보고있는) 장면(scroll-section)

  let enterNewScene; //스크롤 움직임에 따라 스크롤섹션이 바뀔때, 관련함수 결과가 음수가 되는 것을 막기 위한 변수

  const sceneInfo = [
    //sceneInfo[0]
    {
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        msgA: document.querySelector('#scroll-section-0 .main-message.msg-a'),
        msgB: document.querySelector('#scroll-section-0 .main-message.msg-b'),
        msgC: document.querySelector('#scroll-section-0 .main-message.msg-c'),
        msgD: document.querySelector('#scroll-section-0 .main-message.msg-d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
      },
      values: {
        msgA_Opacity_in: [0, 1, { start : 0.1, end: 0.2 }],
        msgA_TranslateY_in: [20, 0, { start : 0.1, end: 0.2 }],
        msgA_Opacity_out: [1, 0, { start : 0.25, end: 0.3}],
        msgA_TranslateY_out: [0, -20, { start : 0.25, end: 0.3 }],

        msgB_Opacity_in: [0, 1, { start : 0.3, end: 0.4}],
        msgB_TranslateY_in: [20, 0, { start : 0.3, end: 0.4}],
        msgB_Opacity_out: [1, 0, { start : 0.45, end: 0.5}],
        msgB_TranslateY_out: [0, -20, { start : 0.45, end: 0.5}],

        msgC_Opacity_in: [0, 1, { start : 0.5, end: 0.6}],
        msgC_TranslateY_in: [20, 0, { start : 0.5, end: 0.6}],
        msgC_Opacity_out: [1, 0, { start : 0.65, end: 0.7}],
        msgC_TranslateY_out: [0, -20, { start : 0.65, end: 0.7}],

        msgD_Opacity_in: [0, 1, { start : 0.7, end: 0.8}],
        msgD_TranslateY_in: [20, 0, { start : 0.7, end: 0.8}],
        msgD_Opacity_out: [1, 0, { start : 0.85, end: 0.9}],
        msgD_TranslateY_out: [0, -20, { start : 0.85, end: 0.9}],

        videoImageCount: 294,
        imageSequence: [0, 293],
        canvas_opacity:[1, 0 , {start: 0.9, end: 1}]
      }
      
    },
    
    //sceneInfo[1]
    {
      type: 'normal',
      // heightNum: 5, //normaltype에서는 필요없음.
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },

    //sceneInfo[2]
      {
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-2'),
          msgA: document.querySelector('#scroll-section-2 .msg-a'),
          msgB: document.querySelector('#scroll-section-2 .msg-b'),
          pinB: document.querySelector('#scroll-section-2 .msg-b .pin'),
          msgC: document.querySelector('#scroll-section-2 .msg-c'),
          pinC: document.querySelector('#scroll-section-2 .msg-c .pin')
        },
        values: {
          msgA_Opacity_in: [0, 1, { start: 0.15, end: 0.25 }],
          msgA_TranslateY_in: [20, 0, { start: 0.15, end: 0.25 }],
          msgA_Opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
          msgA_TranslateY_out: [0, -20, { start: 0.3, end: 0.35 }],
      
          msgB_Opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          msgB_TranslateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          msgB_Opacity_out: [1, 0, { start: 0.6, end: 0.65 }],
          msgB_TranslateY_out: [0, -20, { start: 0.7, end: 0.75 }],
      
          msgC_Opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          msgC_TranslateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          msgC_Opacity_out: [1, 0, { start: 0.8, end: 0.85 }],
          msgC_TranslateY_out: [0, -20, { start: 0.8, end: 0.85 }],
      
          pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.6 }],
          pinB_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          pinB_opacity_out: [1, 0, { start: 0.7, end: 0.75 }],
      
          pinC_scaleY: [0.5, 1, { start: 0.7, end: 0.8 }],
          pinC_opacity_in: [0, 1, { start: 0.7, end: 0.85 }],
          pinC_opacity_out: [1, 0, { start: 0.8, end: 0.85 }]
        }
      },

    //sceneInfo[3]
    {
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption')
      },
      values: {

      }
    }
  ];
  
  function setCanvasImages() {
    let imgElem;
    for(let i=0; i<sceneInfo[0].values.videoImageCount; i++){
      imgElem = new Image();
      imgElem.src = `../Images/cat/${1+i}.jpg`
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
  }
  setCanvasImages();
  console.log(sceneInfo[0].objs.videoImages)

  function setLayout() {
    // 스크롤 섹션의높이 지정
    for(let i = 0; i< sceneInfo.length; i++){
      if(sceneInfo[i].type === 'sticky'){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
      

    yOffset = window.scrollY
    let totalScrollHeight = 0;
    for(let i=0; i< sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset){
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)

    const heightRatio = window.innerHeight / 1080

    console.log(screen.height)
    console.log(window.outerHeight)
    console.log(heightRatio)

    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
  }
  
  

  function scrollLoop(){
    enterNewScene = false;
    prevScrollHeight = 0;
    for(let i =0; i<currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    
    if (yOffset >prevScrollHeight + sceneInfo[currentScene].scrollHeight){
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if (yOffset < prevScrollHeight){
      enterNewScene = true;
      if (currentScene === 0) return; // 모바일등 브라우저의 바운스 효과로 마이너스가 되는 것을 방지
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    } 
    if(enterNewScene) return;

    playAnimation()
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 스크롤섹션에서 스크롤된 범위의 비율
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) { // 2번인덱스가 있는 경우
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart){
        rv = values[0];
      } else if (currentYOffset > partScrollEnd){
        rv = values[1];

      }
    } else{
      rv = scrollRatio * ( values[1] - values[0]) + values[0];
    }
    return rv;

  }

  function playAnimation() {
    const values = sceneInfo[currentScene].values;
    const objs = sceneInfo[currentScene].objs;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight
    const scrollRatio = currentYOffset / scrollHeight

    switch (currentScene) {
      case 0:
        // console.log('0 play') 
        

        /*
          let msgA_Opacity_in = calcValues(values.msgA_Opacity_in, currentYOffset);
          let msgA_Opacity_out = calcValues(values.msgA_Opacity_out, currentYOffset);
          let msgA_TranslateY_in = calcValues(values.msgA_TranslateY_in, currentYOffset);
          let msgA_TranslateY_out = calcValues(values.msgA_TranslateY_out, currentYOffset);
        */
        
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0)
        
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
        
        if(scrollRatio <= 0.22){
          //in
          objs.msgA.style.opacity = calcValues(values.msgA_Opacity_in, currentYOffset);
          objs.msgA.style.transform = `translateY(${calcValues(values.msgA_TranslateY_in, currentYOffset)}%)`
        } else {
          //out
          objs.msgA.style.opacity = calcValues(values.msgA_Opacity_out, currentYOffset);
          objs.msgA.style.transform = `translateY(${calcValues(values.msgA_TranslateY_out, currentYOffset)}%)`
        }

        if(scrollRatio <= 0.42){
          //in
          objs.msgB.style.opacity = calcValues(values.msgB_Opacity_in, currentYOffset);
          objs.msgB.style.transform = `translateY(${calcValues(values.msgB_TranslateY_in, currentYOffset)}%)`
        } else {
          //out
          objs.msgB.style.opacity = calcValues(values.msgB_Opacity_out, currentYOffset);
          objs.msgB.style.transform = `translateY(${calcValues(values.msgB_TranslateY_out, currentYOffset)}%)`
        }

        if(scrollRatio <= 0.62){
          //in
          objs.msgC.style.opacity = calcValues(values.msgC_Opacity_in, currentYOffset);
          objs.msgC.style.transform = `translateY(${calcValues(values.msgC_TranslateY_in, currentYOffset)}%)`
        } else {
          //out
          objs.msgC.style.opacity = calcValues(values.msgC_Opacity_out, currentYOffset);
          objs.msgC.style.transform = `translateY(${calcValues(values.msgC_TranslateY_out, currentYOffset)}%)`
        }

        if(scrollRatio <= 0.82){
          //in
          objs.msgD.style.opacity = calcValues(values.msgD_Opacity_in, currentYOffset);
          objs.msgD.style.transform = `translateY(${calcValues(values.msgD_TranslateY_in, currentYOffset)}%)`
        } else {
          //out
          objs.msgD.style.opacity = calcValues(values.msgD_Opacity_out, currentYOffset);
          objs.msgD.style.transform = `translateY(${calcValues(values.msgD_TranslateY_out, currentYOffset)}%)`
        }
        break;
        
      case 1:
        /* console.log('1 play') */
        

        break;

      case 2:
        /* console.log('2 play') */
        console.log(objs.msgA)
        
        if(scrollRatio <= 0.3){
          //in
          objs.msgA.style.opacity = calcValues(values.msgA_Opacity_in, currentYOffset);
          objs.msgA.style.transform = `translate3d(0, ${calcValues(values.msgA_TranslateY_in, currentYOffset)}%, 0)`; 
        } else {
          //out
          objs.msgA.style.opacity = calcValues(values.msgA_Opacity_out, currentYOffset);
          objs.msgA.style.transform = `translate3d(0, ${calcValues(values.msgA_TranslateY_out, currentYOffset)}%, 0)`; 
        }

        if(scrollRatio <= 0.55){
          //in
          objs.msgB.style.opacity = calcValues(values.msgB_Opacity_in, currentYOffset);
          objs.msgB.style.transform = `translate3d(0, ${calcValues(values.msgB_TranslateY_in, currentYOffset)}%, 0)`;
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`; 
        } else {
          //out
          objs.msgB.style.opacity = calcValues(values.msgB_Opacity_out, currentYOffset);
          objs.msgB.style.transform = `translate3d(0, ${calcValues(values.msgB_TranslateY_out, currentYOffset)}%, 0)`;
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
        }

        if(scrollRatio <= 0.75){
          //in
          objs.msgC.style.opacity = calcValues(values.msgC_Opacity_in, currentYOffset);
          objs.msgC.style.transform = `translate3d(0, ${calcValues(values.msgC_TranslateY_in, currentYOffset)}%, 0)`;
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`; 
        } else {
          //out
          objs.msgC.style.opacity = calcValues(values.msgC_Opacity_out, currentYOffset);
          objs.msgC.style.transform = `translateY(${calcValues(values.msgC_TranslateY_out, currentYOffset)}%)`;
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`
        }

        break;
      
      case 3:
        /* console.log('3 play') */

        break;
    }
  }



  window.addEventListener('scroll', () => {
    yOffset = window.scrollY
    scrollLoop()
  })

  /* window.addEventListener('DOMContentLoaded', setLayout) */
  window.addEventListener('load', () => {
    setLayout()
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0)
    })
  window.addEventListener('resize', setLayout);
  
})();