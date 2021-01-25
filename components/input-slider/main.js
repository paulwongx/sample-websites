/* ================== SLIDER  ================== */
const useSlider = (ids, inputAttr) => {
    const slider = document.getElementById(ids.sliderId);
    const origin = document.getElementById(ids.originId);
    const thumb = document.getElementById(ids.thumbId);
    const fill = document.getElementById(ids.fillId);
    const output = document.getElementById(ids.outputId);
    const sliderLeft = slider.getBoundingClientRect().left;
    const sliderWidth = slider.getBoundingClientRect().width;
    const min = inputAttr.min;
    const max = inputAttr.max;
    const n = max - min;

    let offsetOnThumb = 0;
    let offsetX = 0;
    let adjOffsetX = 0;
    let isDown = false;
    let xPos;

    const handleMouseDown = (e) => {
        isDown = true;
        if (origin.classList.contains('slider--transition')) {
            origin.classList.remove('slider--transition');
            fill.classList.remove('slider--transition');
        }
        xPos = e.clientX || e.touches[0].clientX;
        offsetOnThumb =  xPos - origin.getBoundingClientRect().left;
        // console.log('mouse click down - originX:', offsetOnThumb);
    }

    const handleMouseUp = () => {
        isDown = false;
        offsetOnThumb = 0;
    }

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (isDown) {
            addStyles(e);
        }
    }

    const handleSliderClick = (e) => {
        if (!origin.classList.contains('slider--transition')) {
            origin.classList.add('slider--transition');
            fill.classList.add('slider--transition');
        }
        addStyles(e);
    }

    const addStyles = (e) => {
        xPos = e.clientX || e.touches[0].clientX;
        offsetX = ((xPos - sliderLeft - offsetOnThumb) / sliderWidth) * 100;
        offsetX = Math.max(Math.min(offsetX, 100),0);

        let tmpNum = offsetX/100 - (1/n/2);
        let sel;
        if (tmpNum < 0) {
            adjOffsetX = 0;
            sel = 0;
        } else {
            sel = Math.floor(tmpNum/(1/n)) + 1;
            adjOffsetX = sel * (1/n) * 100;
        }

        origin.style.left = adjOffsetX + '%';
        fill.style.right = 100-adjOffsetX + '%';
        output.innerText = sel;

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
    fillId: 'slider-fill',
    outputId: 'slider-output',
}

const inputAttr = {
    min: 0,
    max: 15,
}

useSlider(ids, inputAttr);

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