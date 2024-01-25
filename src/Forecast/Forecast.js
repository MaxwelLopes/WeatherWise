document.addEventListener('DOMContentLoaded', function() {
    var temperatures = [10, 11, 15, 9];
    var canvas = document.getElementById('temperatureChart');
    var ctx = canvas.getContext('2d');

    // Desenha os pontos
    ctx.beginPath();
    ctx.moveTo(0, 200 - temperatures[0] * 10);

    for (var i = 1; i < temperatures.length; i++) {
      ctx.lineTo(i * 100, 200 - temperatures[i] * 10);
    }

    // Estilo da linha
    ctx.strokeStyle = '#007BFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rótulos
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';

    for (var i = 0; i < temperatures.length; i++) {
      ctx.beginPath();
      ctx.arc(i * 100, 200 - temperatures[i] * 10, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#007BFF';
      ctx.fill();
      ctx.stroke();
      ctx.fillText('Dia ' + (i + 1), i * 100 - 15, 190);
    }
  });