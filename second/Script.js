/**
 * Dropdown menu can be opened by mouse-over and click on key 'M'.
 * And can be closed by mouse-out and 'Escape'.
 */
window.onload = function () {
    document.querySelector('#menu').onmouseover = menuShow;
    document.querySelector('#menu').onmouseout = menuHide;
    document.onkeydown = function (event) {
        if (event.code == 'KeyM') {
            menuShow();
        }
        if (event.code == 'Escape') {
            menuHide();
        }
    }
    function menuShow() {
        document.querySelector('#menu').style.left = 0;
        document.querySelector('.container').style.left = '142px';
    }
    function menuHide() {
        document.querySelector('#menu').style.left = '-208px';
        document.querySelector('.container').style.left = 0;
    }
}

/**
 * Wrapped all elements of tree to 'span' for simplified treatment.
 */
for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    span.classList.add('show');
    li.prepend(span);
    span.append(span.nextSibling);
}

/**
 * Root elements of tree can change their marks from '+' to '-' and vice versa.
 */
tree.onclick = function (event) {
    console.log(event.target.tagName);
    if (event.target.tagName != 'SPAN') return;
    let childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return;
    childrenContainer.hidden = !childrenContainer.hidden;
    if (childrenContainer.hidden) {
        event.target.classList.replace('show', 'hide');
    } else {
        event.target.classList.replace('hide', 'show');
    }
}

/**
 * Output the message when selecting sub-items from first and second root item.
 * Output one of additional pages when selecting sub-items from third root item.
 */
function firstNested(i) {
    let arrayNested = document.querySelectorAll('.firstNested');
    document.getElementById('text').innerHTML
        = 'Big message from '+arrayNested[i].textContent.fontcolor('#bf4747');
}
function secondNested(i) {
    let arrayNested = document.querySelectorAll('.secondNested');
    document.getElementById('text').innerHTML
        = 'Big message from ' + arrayNested[i].textContent.fontcolor('#bf4747');
}
function thirdNested(i) {
    let popup = document.getElementById('popup');
    let firstElement = popup.firstElementChild;
    let iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    popup.insertBefore(iframe, firstElement);
    let closeButton = document.createElement('img');
    popup.insertBefore(closeButton, firstElement);
    closeButton.classList.add('close');
    closeButton.src = "./images/close-icon.png";
    closeButton.addEventListener('click', function(){
        iframe.parentNode.removeChild(iframe);
        closeButton.parentNode.removeChild(closeButton);
    });
    switch (i) {
        case 0:
            iframe.src = 'Additional-1.html';
            break;
        case 1:
            iframe.src = 'Additional-2.html';
            break;
        case 2:
            iframe.src = 'Additional-3.html';
            break;
    }
}

/**
 * There're dinamically changing current time and date in page's footer.
 */
function currentTime() {
    let time = new Date();
    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    document.querySelector('.currentTime').innerHTML = 'Current date and time: '
        + day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
}
setInterval(currentTime, 1000);