import got from 'got';

const apiWeather = async ctx => {
  const { id } = ctx.request.body;
  const { body } = await got(
    `http://weather.livedoor.com/forecast/webservice/json/v1?city=${id}`,
    {
      responseType: 'json'
    }
  );

  ctx.body = {
    title: body.title,
    forecasts: body.forecasts
  };
};

export default apiWeather;
