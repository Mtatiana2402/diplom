// Параллакс-эффект 
window.onscroll = function() {
    var scroll = window.pageYOffset || document.body.scrollTop;
    
    scale = (100 + (scroll/2.5)) / 100;
    shiftY = (scroll / 7);
    scaleText = (100 - (scroll/4)) / 100;

    var parallax = document.querySelector('.parallax img');
    var parallaxText = document.querySelector('.content');
        
    parallax.style.transform = 'translate3d( 0%, -' + shiftY + '%, 0) scale(' + scale + ')',
    parallaxText.style.transform = 'scale(' + scaleText + ')';
    
    var H =  (document.querySelector('.parallax img').offsetHeight - 90);
    
    if (H > scroll) {
        document.querySelector('.menu').style.background = 'transparent';}
        else {
        document.querySelector('.menu').style.backgroundImage = 'url(Images/bg-header.png)';
        document.querySelector('.menu').style.backgroundSize = '100% 100%';
    };
     
};

// Пагинация страниц
var paginationPage = parseInt(document.querySelector('.block-pag[actpage]'), 10);
var a = document.querySelector('.block-pag');
a.onclick = function(e) {
  var activLink = e.target;
  if (activLink !== e.currentTarget) {
  var go = activLink.getAttribute('href').replace('#!', '');
    if (go === '+1') {
      paginationPage++;
    } else if (go === '-1') {
      paginationPage--;
    }else{
      paginationPage = parseInt(go, 10);
    }
    a.setAttribute('actpage', paginationPage);
  }
  else {
    paginationPage = 1;
    a.setAttribute('actpage', paginationPage);
  }
    var visPage = document.querySelector('.vis');
    // console.log(visPage);
    if (visPage == null) {
      firstPage = document.querySelector('section[page="1"]');
      firstPage.classList.add('vis');
    }
    else {
      visPage.classList.add('unvis');
      visPage.classList.remove('vis');
          
      var page = 'page='+'"'+paginationPage+'"';
      // console.log(page);
      var activPage = document.querySelector('section['+page+']');
      activPage.classList.add('vis');
      activPage.classList.remove('unvis');
    }
    // console.log(activPage);
    
}

// Работа с формой
var form = document.forms['contact'];
var email = form.elements['email'];
var company = form.elements['company'];
var subject = form.elements['subject'];
var message = form.elements['message'];

form.onsubmit = function(e) {
    var reg = /^([A-Za-z0-9_\-\.]{3})+\@([A-Za-z]{4})+\.([A-Za-z]{2})$/;
    var address = email.value;
    var com = company.value;
    var sub = subject.value;
    var mes = message.value;

    //Валидация email на формат (xxx@xxxx.xx)
    if (reg.test(address) == false) {
        alert('Введите корректный e-mail в формате: xxx@xxxx.xx');
    }
    else {
    alert('Your email: ' + address+'\n'+
          'Company: ' + com+'\n'+
          'Subject: ' + sub +'\n'+
          'Your message: ' + mes);
    }
    
   return false;
}


//Реализация поиска по названию (название указано в атрибуте title)
var seach = document.querySelector('.seach-control');

seach.onchange = function(e) {
  
  var titles = document.querySelectorAll('div[title]');
  var titlesArr = Array.from(titles);
  var result;
  
  titlesArr.filter(function(el) {
    seachText = seach.value;
    if (el.getAttribute('title') == seachText) {
      result = el;
    }
  })

  if (result == undefined) {
    alert('По вашему запросу ничего не найдено')
  }
  else {
    var visPage = document.querySelector('.vis');
    visPage.classList.add('unvis');
    visPage.classList.remove('vis');

    findPage = result.parentElement.parentElement;
    findPage.classList.remove('unvis');
    findPage.classList.add('vis');

    numberPage = findPage.getAttribute('page');
    a = document.querySelector('.block-pag');
    a.setAttribute('actpage', numberPage);
  }
  
  // console.log(result);
}
