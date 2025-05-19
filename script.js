const catCursor = document.querySelector('.cat-cursor');
const container = document.querySelector('.container');

// ネズミの配列を作成
const mice = [];
const mouseCount = 20;

// ネズミを生成する関数
function createMouse() {
    const mouse = document.createElement('div');
    mouse.className = 'floating-element';
    mouse.textContent = '🐭';
    document.body.appendChild(mouse);
    return {
        element: mouse,
        posX: Math.random() * (window.innerWidth - 50),
        posY: Math.random() * (window.innerHeight - 50),
        velocityX: 0,
        velocityY: 0
    };
}

// 20匹のネズミを生成
for (let i = 0; i < mouseCount; i++) {
    mice.push(createMouse());
}

// 猫のカーソルの動きを追跡
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // 猫のカーソルを更新
    catCursor.style.left = mouseX + 'px';
    catCursor.style.top = mouseY + 'px';

    // 各ネズミに対して処理
    mice.forEach(mouse => {
        // 猫とネズミの距離を計算
        const dx = mouseX - mouse.posX;
        const dy = mouseY - mouse.posY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 猫が近づいたら逃げる
        if (distance < 150) {
            // 逃げる方向を計算
            const angle = Math.atan2(dy, dx);
            const speed = 15;
            
            // 速度を更新
            mouse.velocityX -= Math.cos(angle) * speed;
            mouse.velocityY -= Math.sin(angle) * speed;
        }
    });
});

function updatePosition() {
    // 各ネズミの位置を更新
    mice.forEach(mouse => {
        // 速度を適用
        mouse.posX += mouse.velocityX;
        mouse.posY += mouse.velocityY;

        // 画面の端での跳ね返り
        if (mouse.posX < 0) {
            mouse.posX = 0;
            mouse.velocityX = Math.abs(mouse.velocityX);
        } else if (mouse.posX > window.innerWidth - 50) {
            mouse.posX = window.innerWidth - 50;
            mouse.velocityX = -Math.abs(mouse.velocityX);
        }

        if (mouse.posY < 0) {
            mouse.posY = 0;
            mouse.velocityY = Math.abs(mouse.velocityY);
        } else if (mouse.posY > window.innerHeight - 50) {
            mouse.posY = window.innerHeight - 50;
            mouse.velocityY = -Math.abs(mouse.velocityY);
        }

        // 位置を更新
        mouse.element.style.left = mouse.posX + 'px';
        mouse.element.style.top = mouse.posY + 'px';

        // 減速
        mouse.velocityX *= 0.95;
        mouse.velocityY *= 0.95;
    });

    requestAnimationFrame(updatePosition);
}

// アニメーション開始
updatePosition(); 