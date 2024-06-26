# WeatherWise
WeatherWise é um site que permite visualizar o clima atual e previsões para as próximas horas. Ele utiliza a API do OpenWeatherMap para obter informações meteorológicas em tempo real e a API do Google para autocompletar locais.

<img src=".\public\Thunderstorm.svg" width="300"/>

<img src="readme/mesquita.png" width="200" height="237"/><img src="readme/riobranco.png"  width="200" height="237"/><img src="readme/rigolet.png"  width="200" height="237"/><img src="readme/toquio.png" width="200" height="237"/>

## Tecnologias Utilizadas

- React
- Vite (ferramenta de build)
- API do OpenWeatherMap
- API do Google Places Autocomplete
- Chart.js (Biblioteca para renderizar os gráficos)

## Acesso ao Site

Você pode acessar o WeatherWise clicando [aqui](https://maxwel-batalha-weatherwise.onrender.com/).

## Instalação

Para começar a usar o WeatherWise, siga estas etapas simples:

1. Antes de tudo, certifique-se de ter o Node.js instalado em seu sistema.

2. Clone este repositório:

    ```bash
    git clone https://github.com/MaxwelLopes/WeatherWise.git
    cd WeatherWise
    ```

3. Instale as dependências do projeto:

    ```bash
    npm install
    ```

4. Antes de prosseguir, você precisará de duas chaves de API pessoais:
    - Uma chave do OpenWeatherMap, que você pode obter [aqui](https://openweathermap.org/api).
    - Uma chave do Google, que você pode obter [aqui](https://cloud.google.com/apis?hl=pt-BR).

5. Crie um arquivo `.env` no diretório raiz e adicione suas chaves de API:

    ```
    VITE_KEY_WEATHER='SUA_KEY_DO_OPENWEATHERMAP'
    VITE_KEY_GOOGLE='SUA_KEY_DO_GOOGLE'
    ```

## Como Usar

1. Inicie o projeto com:

    ```bash
    npm run dev
    ```


## Créditos de Atribuição

Os ícones de clima utilizados neste projeto são fornecidos pela [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/) e estão licenciados sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Esses ícones fornecem representações visuais dos diferentes tipos de condições climáticas, adicionando uma camada adicional de informação ao nosso aplicativo WeatherWise.





