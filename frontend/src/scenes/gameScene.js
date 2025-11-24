// scenes/gameScene.js

export default function gameScene(k) {
    k.scene("gameScene", () => {

        // ------------ VARIABLES DEL JUEGO ------------
        let score = 0
        const targetScore = 10
        const timeLimit = 40
        let remaining = timeLimit
        const playerSpeed = 280
        const bulletSpeed = 450
        const enemyBulletSpeed = 240

        // ------------ UI / HUD ------------
        const scoreText = k.add([
            k.text(`Puntos: ${score}`, { size: 20 }),
            k.pos(20, 20),
            k.fixed(),
        ])

        const timerText = k.add([
            k.text(`Tiempo: ${remaining}`, { size: 20 }),
            k.pos(20, 50),
            k.fixed(),
        ])

        // Timer
        k.loop(1, () => {
            remaining--
            timerText.text = `Tiempo: ${remaining}`
            if (remaining <= 0) {
                k.go("gameover", { victory: false, score })
            }
        })

        // ------------ PLAYER / NAVE ------------
        const player = k.add([
            k.rect(40, 25),
            k.color(0, 150, 255),
            k.area(),
            k.pos(k.width() / 2, k.height() - 60),
            k.anchor("center"),
            "player"
        ])

        // Movimiento del jugador
        k.onKeyDown("left", () => {
            player.move(-playerSpeed, 0)
        })

        k.onKeyDown("right", () => {
            player.move(playerSpeed, 0)
        })

        // ------------ DISPARO DEL JUGADOR ------------
        function shoot() {
            k.add([
                k.rect(6, 14),
                k.color(255, 255, 0),
                k.area(),
                k.pos(player.pos.x, player.pos.y - 25),
                k.anchor("center"),
                "bullet",
                { dir: -1 }
            ])
        }

        k.onKeyPress("space", () => shoot())

        k.onUpdate("bullet", (b) => {
            b.move(0, b.dir * bulletSpeed)
            if (b.pos.y < -10) k.destroy(b)
        })

        // ------------ OBJETIVOS ESTÁTICOS ------------

        function spawnTarget() {
            return k.add([
                k.rect(35, 35),
                k.color(255, 80, 80),
                k.area(),
                k.pos(
                    k.rand(40, k.width() - 40),
                    k.rand(80, k.height() / 2)
                ),
                k.anchor("center"),
                "target"
            ])
        }

        // Spawn inicial de 3 objetivos
        for (let i = 0; i < 3; i++) spawnTarget()

        // Jugador destruye objetivo
        k.onCollide("bullet", "target", (b, t) => {
            k.destroy(b)
            k.destroy(t)

            score++
            scoreText.text = `Puntos: ${score}`

            // Respawn
            spawnTarget()

            if (score >= targetScore) {
                k.go("gameover", { victory: true, score })
            }
        })

        // ------------ BALAS ENEMIGAS QUE CAEN ------------
        function spawnEnemyBullet() {
            k.add([
                k.rect(10, 15),
                k.color(255, 0, 0),
                k.area(),
                k.pos(k.rand(20, k.width() - 20), -10),
                k.anchor("center"),
                "enemyBullet"
            ])
        }

        k.loop(0.8, () => spawnEnemyBullet())

        k.onUpdate("enemyBullet", (b) => {
            b.move(0, enemyBulletSpeed)
            if (b.pos.y > k.height() + 10) k.destroy(b)
        })

        // Si una bala enemiga toca al jugador → game over
        k.onCollide("player", "enemyBullet", () => {
            k.go("gameover", { victory: false, score })
        })

        // ------------ BOTÓN VOLVER AL MENÚ ------------
        const menuButton = k.add([
            k.rect(180, 45, { radius: 8 }),
            k.color(60, 60, 60),
            k.pos(k.width() - 200, 20),
            k.area(),
            k.fixed(),
            "menu-btn",
            k.z(1000),
        ])

        const menuLabel = k.add([
            k.text("Volver al menú", { size: 20 }),
            k.pos(k.width() - 185, 32),
            k.color(255, 255, 255),
            k.area(),      // ← ESTA VEZ SÍ TIENE AREA
            k.fixed(),
            k.z(1001),
            "menu-label",
        ])

        k.onClick("menu-btn", () => k.go("start"))
        k.onClick("menu-label", () => k.go("start"))
    })
}
