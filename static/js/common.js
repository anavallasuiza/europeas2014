define([], function() {
	'use strict';

	var helpers = {
		percent: function(total, value) {
			return Math.floor((value * 100) / total);
		},
		getInfoPartido: function (id, nome, valorDefault) {
			var partido = helpers.info[id];

			if (partido) {
				return partido[nome] || valorDefault;
			}

			return valorDefault;
		},
		info: {
			"0048": {
				codigo: "0048",
				nombre: "SAIn",
				color: "#660066"
			},
			"0012": {
				codigo: "0012",
				nombre: "PSOE",
				color: "#FF3333"
			},
			"0056": {
				codigo: "0056",
				nombre: "IPEX-PREX-CREX",
				color: "#FFCC99"
			},
			"0003": {
				codigo: "0003",
				nombre: "PP",
				color: "#3333FF"
			},
			"0020": {
				codigo: "0020",
				nombre: "In.Fem.",
				color: "#9966FF"
			},
			"0017": {
				codigo: "0017",
				nombre: "CpEU",
				color: "#33FF00"
			},
			"0058": {
				codigo: "0058",
				nombre: "Europa Problema",
				color: "#990033"
			},
			"0002": {
				codigo: "0002",
				nombre: "Foro FAC",
				color: "#66CCFF"
			},
			"0018": {
				codigo: "0018",
				nombre: "Proyecto Europa",
				color: "#FFCC99"
			},
			"0004": {
				codigo: "0004",
				nombre: "UPyD",
				color: "#FF33CC"
			},
			"0055": {
				codigo: "0055",
				nombre: "IU-IP",
				color: "#CC0000"
			},
			"0008": {
				codigo: "0008",
				nombre: "PACMA",
				color: "#003300"
			},
			"0005": {
				codigo: "0005",
				nombre: "Corriente Roja",
				color: "#CC0033"
			},
			"0043": {
				codigo: "0043",
				nombre: "ERC-EPDD",
				color: "#CC6633"
			},
			"0050": {
				codigo: "0050",
				nombre: "AlRep",
				color: "#990033"
			},
			"0011": {
				codigo: "0011",
				nombre: "Cs",
				color: "#FF9933"
			},
			"0042": {
				codigo: "0042",
				nombre: "Piratas",
				color: "#99CC66"
			},
			"0047": {
				codigo: "0047",
				nombre: "Impulso Social",
				color: "#333333"
			},
			"0040": {
				codigo: "0040",
				nombre: "MSR",
				color: "#666666"
			},
			"0067": {
				codigo: "0067",
				nombre: "Recortes 0",
				color: "#990033"
			},
			"0007": {
				codigo: "0007",
				nombre: "PREPAL",
				color: "#FFCC99"
			},
			"0052": {
				codigo: "0052",
				nombre: "Primavera Europea",
				color: "#33FF66"
			},
			"0049": {
				codigo: "0049",
				nombre: "Bildu-BNG-OPD",
				color: "#339900"
			},
			"0021": {
				codigo: "0021",
				nombre: "ExU",
				color: "#FFCC99"
			},
			"0038": {
				codigo: "0038",
				nombre: "PA",
				color: "#FFCC99"
			},
			"0023": {
				codigo: "0023",
				nombre: "PH",
				color: "#FF9900"
			},
			"0025": {
				codigo: "0025",
				nombre: "EEB",
				color: "#CCCCC"
			},
			"0053": {
				codigo: "0053",
				nombre: "VOX",
				color: "#FF6600"
			},
			"0045": {
				codigo: "0045",
				nombre: "Podemos",
				color: "#FF6600"
			},
			"0016": {
				codigo: "0016",
				nombre: "P-Lib",
				color: "#FFFF66"
			},
			"0009": {
				codigo: "0009",
				nombre: "PTerra",
				color: "#99CC99"
			},
			"0022": {
				codigo: "0022",
				nombre: "FE JONS",
				color: "#333333"
			},
			"0044": {
				codigo: "0044",
				nombre: "España en Marcha",
				color: "#666666"
			},
			"0037": {
				codigo: "0037",
				nombre: "PCPE",
				color: "#990033"
			},
			"0039": {
				codigo: "0039",
				nombre: "DN",
				color: "#666666"
			},
			"0028": {
				codigo: "0028",
				nombre: "P X",
				color: "#CCCC99"
			},
			"0041": {
				codigo: "0041",
				nombre: "M RED",
				color: "#CCCC99"
			},
			"0186": {
				codigo: "0186",
				nombre: "D y Enf R",
				color: "#CCCC99"
			},
			"0014": {
				codigo: "0014",
				nombre: "CILUS",
				color: "#CCCC99"
			},
			"-1": {
				codigo: "00",
				nombre: "Blanco",
				color: "#CCCCCC",
			},
			"-2": {
				codigo: "00",
				nombre: "Nulos",
				color: "#BBBBBB"
			},
			"-3": {
				codigo: "00",
				nombre: "Otros",
				color: "#AAAAAA"
			}
		}
	};

	return helpers;

});
