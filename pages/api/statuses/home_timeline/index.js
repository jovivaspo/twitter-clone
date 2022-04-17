const timelines = [
    {
        username: "Jorge Vivas",
        name:"Jorge Vivas Pocostales",
        avatar: "https://static2.elnortedecastilla.es/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg",
        message: " Hola, estoy es una prueba."

    },
    {
        username: "Jorge Vivas",
        name:"Jorge Vivas Pocostales",
        avatar: "https://static2.elnortedecastilla.es/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg",
        message: " Hola, estoy es una prueba."

    },
    {
        username: "Jorge Vivas",
        name:"Jorge Vivas Pocostales",
        avatar: "https://static2.elnortedecastilla.es/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg",
        message: " Hola, estoy es una prueba."

    }
]
   

export default function handler(req, res) {
    res.setHeader('Content-Type', 'applicaion/json')
    res.status(200).json({ timelines })
  }