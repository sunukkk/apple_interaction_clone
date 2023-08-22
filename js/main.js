(() => {
  
  let yOffset = 0; // window.pageYOffset 담을 변수
  let prevScrollHeight = 0; // yoffset보다 이전에 위치한 스크롤 섹션들의 높이값의 합
  let currentScene = 0; // 현재 활성화 된 (보고있는) 장면(scroll-section)

  const sceneInfo = [
    {
      //0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },

    {
      //1
      type: 'normal',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },

    {
      //2
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },

    {
      //3
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  function setLayout() {
    // 스크롤 섹션의높이 지정
    for(let i = 0; i< sceneInfo.length; i++){
      sceneInfo[i].scrollHeight =sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset
    let totalScrollHeight = 0;
    for(let i=0; i< sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset){
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }
  


  function scrollLoop(){
    prevScrollHeight = 0;
    for(let i =0; i<currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    
    if (yOffset >prevScrollHeight + sceneInfo[currentScene].scrollHeight){
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if (yOffset < prevScrollHeight){
      if (currentScene === 0) return; // 모바일등 브라우저의 바운스 효과로 마이너스가 되는 것을 방지
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }
    
  }


  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop()
  })

  /* window.addEventListener('DOMContentLoaded', setLayout) */
  window.addEventListener('load', setLayout)
  window.addEventListener('resize', setLayout);
  
})();