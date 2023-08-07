export const drawSquiggleStrokeWord = function (ctx, lineWidth, strokeStyle) {
  ctx.save();

  /*
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(109.65317, 0);
  ctx.lineTo(109.65317, 31.029236);
  ctx.lineTo(0, 31.029236);
  ctx.closePath();
  ctx.clip();
  ctx.translate(0, 0);
  ctx.translate(0, 0);
  ctx.scale(1, 1);
  ctx.translate(0, 0);
 
  //ctx.strokeStyle = "rgba(0,0,0,0)";
  //ctx.lineCap = "rounded";
  //ctx.lineJoin = "rounded";
  */
  ctx.miterLimit = 4;
  ctx.save();
  ctx.translate(-878.36032, -93.527492);
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(983.33203, 114.75586);
  ctx.bezierCurveTo(
    981.4511600000001,
    113.39038,
    980.16659,
    111.14272,
    980.29348,
    108.78252
  );
  ctx.bezierCurveTo(
    980.34518,
    106.96336000000001,
    981.03431,
    105.04846,
    980.31248,
    103.28906
  );
  ctx.bezierCurveTo(
    980.06014,
    102.8512,
    979.50905,
    103.63193000000001,
    979.15785,
    103.76062
  );
  ctx.bezierCurveTo(
    976.61355,
    105.72552,
    974.5816900000001,
    108.25226,
    972.2504,
    110.45118000000001
  );
  ctx.bezierCurveTo(
    970.79567,
    111.81481000000001,
    969.32206,
    113.25450000000001,
    967.51365,
    114.13086000000001
  );
  ctx.bezierCurveTo(
    964.87816,
    115.1924,
    961.73804,
    113.43867000000002,
    960.88865,
    110.80859000000001
  );
  ctx.bezierCurveTo(
    959.84788,
    108.31110000000001,
    960.41594,
    105.54757000000001,
    959.8713,
    102.96234000000001
  );
  ctx.bezierCurveTo(
    959.7728000000001,
    102.33785000000002,
    959.71687,
    101.69373000000002,
    959.2031000000001,
    101.60742000000002
  );
  ctx.bezierCurveTo(
    958.2737400000001,
    101.62262000000001,
    957.2655100000001,
    103.46082000000001,
    956.28615,
    104.36940000000001
  );
  ctx.bezierCurveTo(
    952.61386,
    108.29689000000002,
    949.51471,
    110.78962000000001,
    945.37107,
    114.25781
  );
  ctx.bezierCurveTo(
    943.7892800000001,
    115.46314000000001,
    941.33209,
    115.56320000000001,
    939.8906000000001,
    114.07422000000001
  );
  ctx.bezierCurveTo(
    938.30014,
    112.53523000000001,
    937.9093700000001,
    112.25988000000001,
    937.2324000000001,
    110.24414000000002
  );
  ctx.bezierCurveTo(
    936.4358100000001,
    107.48881000000002,
    936.1863500000001,
    103.17129000000001,
    934.6889800000001,
    100.67853000000002
  );
  ctx.bezierCurveTo(
    934.1990600000001,
    100.39412000000003,
    933.8342600000001,
    100.48339000000003,
    933.4475000000001,
    100.66953000000002
  );
  ctx.bezierCurveTo(
    930.6668700000001,
    103.15961000000003,
    928.3386900000002,
    108.10305000000002,
    925.6086300000001,
    110.64584000000002
  );
  ctx.bezierCurveTo(
    924.5206400000001,
    111.67441000000002,
    923.31637,
    112.82969000000003,
    921.74607,
    112.93318000000002
  );
  ctx.bezierCurveTo(
    919.80586,
    113.20144000000002,
    918.1383500000001,
    111.65693000000002,
    917.39842,
    109.98982000000002
  );
  ctx.bezierCurveTo(
    916.01103,
    107.30989000000002,
    915.17402,
    104.34573000000002,
    914.92898,
    101.34343000000003
  );
  ctx.bezierCurveTo(
    914.6778800000001,
    100.47314000000003,
    914.19505,
    99.22462000000003,
    913.42771,
    99.05818400000003
  );
  ctx.bezierCurveTo(
    912.41796,
    99.07156400000002,
    911.0081200000001,
    100.52755000000002,
    910.11185,
    102.00844000000002
  );
  ctx.bezierCurveTo(
    908.92236,
    104.10026000000002,
    906.27773,
    110.84490000000002,
    903.77171,
    112.62391000000002
  );
  ctx.bezierCurveTo(
    902.69612,
    113.33068000000003,
    901.32719,
    113.51909000000002,
    900.12303,
    113.05428000000002
  );
  ctx.bezierCurveTo(
    898.6258,
    112.71232000000002,
    897.83386,
    107.24275000000002,
    897.5023199999999,
    105.86040000000003
  );
  ctx.bezierCurveTo(
    896.3418899999999,
    102.22718000000003,
    896.09015,
    97.79125900000003,
    894.91085,
    97.54347900000002
  );
  ctx.bezierCurveTo(
    893.02953,
    97.61998900000002,
    892.6630299999999,
    101.41759000000002,
    891.3858,
    103.38528000000002
  );
  ctx.bezierCurveTo(
    889.24593,
    106.91469000000002,
    887.21669,
    110.57664000000003,
    885.2233,
    114.25971000000003
  );
  ctx.stroke();
  ctx.restore();
  ctx.restore();
  ctx.restore();
};
