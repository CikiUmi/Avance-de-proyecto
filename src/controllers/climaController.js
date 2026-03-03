const axios = require("axios");

exports.obtenerRecomendacion = async (req, res) => {
    try {
        const { ciudad } = req.query;

        if (!ciudad) {
            return res.status(400).json({
                error: "Debe proporcionar una ciudad"
            });
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.API_KEY}&units=metric`
        );

        const temperatura = response.data.main.temp;
        let recomendacion = "";

        if (temperatura < 15) {
            recomendacion = "Chamarras y suéteres";
        } else if (temperatura <= 25) {
            recomendacion = "Ropa casual ligera";
        } else {
            recomendacion = "Playeras y ropa fresca";
        }

        res.json({
            ciudad,
            temperatura,
            recomendacion
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener datos del clima"
        });
    }
};
