const floatingElement = document.querySelector('.floating-element');
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let velocityX = 0;
let velocityY = 0;

// 初期位置を設定
floatingElement.style.left = posX + 'px';
floatingElement.style.top = posY + 'px';

function updatePosition() {
    // 速度を適用
    posX += velocityX;
    posY += velocityY;

    // 画面の端での跳ね返り
    if (posX < 0) {
        posX = 0;
        velocityX = Math.abs(velocityX);
    } else if (posX > window.innerWidth - floatingElement.offsetWidth) {
        posX = window.innerWidth - floatingElement.offsetWidth;
        velocityX = -Math.abs(velocityX);
    }

    if (posY < 0) {
        posY = 0;
        velocityY = Math.abs(velocityY);
    } else if (posY > window.innerHeight - floatingElement.offsetHeight) {
        posY = window.innerHeight - floatingElement.offsetHeight;
        velocityY = -Math.abs(velocityY);
    }

    // 位置を更新
    floatingElement.style.left = posX + 'px';
    floatingElement.style.top = posY + 'px';

    // 減速
    velocityX *= 0.95;
    velocityY *= 0.95;

    requestAnimationFrame(updatePosition);
}

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // マウスと要素の距離を計算
    const dx = mouseX - posX;
    const dy = mouseY - posY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // マウスが近づいたら逃げる
    if (distance < 150) {
        // 逃げる方向を計算
        const angle = Math.atan2(dy, dx);
        const speed = 15;
        
        // 速度を更新
        velocityX -= Math.cos(angle) * speed;
        velocityY -= Math.sin(angle) * speed;
    }
});

// アニメーション開始
updatePosition(); 