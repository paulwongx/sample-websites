/* ================== ENABLE SLIDER FUNCTIONALITY ================== */
const enableSlider = (ids) => {
    const slider = document.getElementById(ids.sliderId);
    const origin = document.getElementById(ids.originId);
    const thumb = document.getElementById(ids.thumbId);
    const sliderLeft = slider.getBoundingClientRect().left;
    const sliderWidth = slider.getBoundingClientRect().width;

    let offsetOnThumb = 0;
    let offsetX = 0;
    let isDown = false;
    let xPos;

    const handleMouseDown = (e) => {
        isDown = true;
        if (origin.classList.contains('slider--transition')) {
            origin.classList.remove('slider--transition');
        }
        xPos = e.clientX || e.touches[0].clientX;
        offsetOnThumb =  xPos - origin.getBoundingClientRect().left;
        console.log('mouse click down - originX:', offsetOnThumb);
    }

    const handleMouseUp = () => {
        isDown = false;
    }

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (isDown) {
            xPos = e.clientX || e.touches[0].clientX;
            offsetX = ((xPos - sliderLeft - offsetOnThumb) / sliderWidth) * 100;
            offsetX = Math.max(Math.min(offsetX, 100),0);
            origin.style.left = offsetX + '%';
            console.log('mouse move - offsetX:', offsetX);
        }
    }

    const handleSliderClick = (e) => {
        if (!origin.classList.contains('slider--transition')) {
            origin.classList.add('slider--transition');
        }
        xPos = e.clientX || e.touches[0].clientX;
        offsetX = ((xPos - sliderLeft) / sliderWidth) * 100;
        offsetX = Math.max(Math.min(offsetX, 100),0);

        origin.style.left = offsetX + '%';
    }

    thumb.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);

    // mobile
    thumb.addEventListener('touchstart', handleMouseDown, true);
    document.addEventListener('touchend', handleMouseUp, true);
    document.addEventListener('touchmove', handleMouseMove, true);

    // track
    slider.addEventListener('click', handleSliderClick, true);
    slider.addEventListener('touchstart', handleSliderClick, true);
}

const ids = {
    sliderId: 'slider-base',
    originId: 'slider-origin',
    thumbId: 'slider-thumb',
    leftId: 'slider-left',
}

enableSlider(ids);


/*

https://stackoverflow.com/questions/24050738/javascript-how-to-dynamically-move-div-by-clicking-and-dragging
https://www.w3schools.com/howto/howto_js_draggable.asp

ReactJS Events: https://reactjs.org/docs/events.html
onDrag, onTouchStart onTouchEnd onTouchMove

HTML JS Events: https://www.w3schools.com/jsref/event_ondrag.asp
ondrag

bottom: 252.1999969482422
height: 10
left: 162.3125
right: 939.0125122070312
top: 242.1999969482422
width: 776.7000122070312
x: 162.3125
y: 242.1999969482422


onmousedown same as ontouchstart
onmouseup same as ontouchend



*/