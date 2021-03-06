require(['../../static/js/config'], function () {

	require([
	'jquery',
	'modal'

	], function($, modal) {
		var escanos = {
			"PP": 16,
			"PSOE": 14,
			"IU-IP": 6,
			"Podemos": 5,
			"UPyD": 4,
			"CEU": 3,
			"EPDD": 2,
			"CS": 2,
			"LPD": 1,
			"PE": 1
		};

		var data = [
			{ 
				"partido": "PP", 
				"candidatos": [ 
					{ 
						"nome": "Miguel Arias Cañete", 
						"foto": "PP1_arias_canete.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Esteban González Pons", 
						"foto": "PP2_gonzalez_pons.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Teresa Jiménez Becerril Barrio", 
						"foto": "PP3_jimenez_becerril.jpg", 
						"sexo": "M" 
					},
					{
						"nome": "Luis de Grandes Pascual", 
						"foto": "PP4_degrandes_pascual.jpg", 
						"sexo": "V" 
					},
					{
						"nome": "Pilar del Castillo Vera", 
						"foto": "PP5_delcastillo_vera.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Ramón Luis Valcárcel Siso", 
						"foto": "PP6_valcarcel_siso.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Rosa Estarás Ferragut", 
						"foto": "PP7_estaras_ferragut.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Francisco José Millán Mon", 
						"foto": "PP8_millan_mon.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Pablo Zalba Bidegain", 
						"foto": "PP9_zalba_bidegain.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Verónica Lope Fontagne", 
						"foto": "PP10_lope_fontagne.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Antonio López-Istúriz White", 
						"foto": "PP11_lopezisturiz_white.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Santiago Fisas Ayxela", 
						"foto": "PP12_fisas_ayxela.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Gabriel Mato Adrover", 
						"foto": "PP13_mato_adrover.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "María del Pilar Ayuso González", 
						"foto": "PP14_ayuso_gonzalez.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "María Esther Herranz García", 
						"foto": "PP15_herranz_garcia.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Agustín Díaz de Mera García Consuegra", 
						"foto": "PP16_diazdemera_garciaconsuegra.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Carlos Iturgaiz Angulo", 
						"foto": "PP17_iturgaiz_angulo.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "José Ignacio Salafranca Sánchez-Neira", 
						"foto": "PP18_salafranca_sanchezneira.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Auxiliadora Correa Zamora", 
						"foto": "PP19_correa_zamora.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Eva Ortiz Vilella", 
						"foto": "PP20_ortiz_vilella.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Pablo Arias Echeverría", 
						"foto": "PP21_arias_echeverria.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Salvador Garriga Polledo", 
						"foto": "PP22_garriga_polledo.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Gabino Puche Rodríguez-Acosta", 
						"foto": "PP23_puche_rodriguezacosta.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Luisa Peón Pérez", 
						"foto": "PP24_peon_perez.jpg", 
						"sexo": "M" 
					}
				]
			},
			{ 
				"partido": "PSOE", 
				"candidatos": [ 
					{ 
						"nome": "Elena Valenciano", 
						"foto": "PSOE1_valenciano_martinez.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Ramón Jauregui Atondo", 
						"foto": "PSOE2_jauregui_atondo.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Soledad Cabezón Ruiz", 
						"foto": "PSOE3_cabezon_ruiz.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Fernando López Aguilar", 
						"foto": "PSOE4_lopez_aguilar.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Iratxe García Pérez", 
						"foto": "PSOE5_garcia_perez.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Javier López Fernández", 
						"foto": "PSOE6_lopez_fernandez.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Inmaculada Rodríguez-Piñeiro Fernández", 
						"foto": "PSOE7_rodriguezpineiro_fernandez.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Enrique Guerrero Salom", 
						"foto": "PSOE8_guerrero_salom.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Eider Gardiazábal Ruibal", 
						"foto": "PSOE9_gardiazabal_ruibal.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "José Blanco López", 
						"foto": "PSOE10_blanco_lopez.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "Clara Aguilera García", 
						"foto": "PSOE11_aguilera_garcia.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Sergio Gutiérrez Prieto", 
						"foto": "PSOE12_sergio_gutierrez.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Inés Ayala Sender", 
						"foto": "PSOE13_ines_ayala.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Jonás Fernández Álvares", 
						"foto": "PSOE14_jonas_fernandez.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Esther Niubó Cidoncha", 
						"foto": "PSOE15_esther_niubo.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Borja Cabezón Royo", 
						"foto": "PSOE16_borja_cabezon.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "María del Carmen Ortiz Rivas", 
						"foto": "PSOE17_carmen_ortiz.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Ricardo Cortés Lastra", 
						"foto": "PSOE18_ricardo_cortes.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Begoña García Bernal", 
						"foto": "PSOE19_begona_garcia.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Pere Joan Pons Sampietro", 
						"foto": "PSOE20_pere_pons.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Paloma Muñiz de Urquiza", 
						"foto": "PSOE21_maria_muniz.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Juan Ramón Ferreira Alonso", 
						"foto": "PSOE22_ramon_ferreira.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Isabel Casalduero Jódar", 
						"foto": "PSOE23_isabel_casalduero.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Alejandro Colldefors Bergnes de las Casas", 
						"foto": "PSOE24_alejandro_colldefors.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Rosa María Balas Torres", 
						"foto": "PSOE25_rosa_balas.png", 
						"sexo": "M" 
					}
				] 
			},
			{ 
				"partido": "IU-IP", 
				"candidatos": [ 
					{ 
						"nome": "Willy Enrique Meyer Pleite", 
						"foto": "IU1_willy_meyer.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Paloma López Bermejo", 
						"foto": "IU2_paloma_lopez.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Ernest Urtasun Domenech", 
						"foto": "IU3_ernest_urtasun.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Marina Albiol Guzmán", 
						"foto": "IU4_marina_albiol.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "María Lidia Senra Rodríguez", 
						"foto": "IU5_lidia_senra.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Ángela Rosa Vallina de la Noval", 
						"foto": "IU6_angela_vallina.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Javier Couso Permuy", 
						"foto": "IU7_javier_couso.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Anastasio Oliver Palomo", 
						"foto": "IU8_tasio_oliver.png", 
						"sexo": "V" 
					}
				]		
			},
			{ 
				"partido": "Podemos", 
				"candidatos": [ 
					{ 
						"nome": "Pablo Iglesias Turrión", 
						"foto": "PODEMOS1_pablo_iglesias.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Teresa Rodríguez-Rubio Vázquez", 
						"foto": "PODEMOS2_teresa_rodriguez.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Carlos Jiménez Villarejo", 
						"foto": "PODEMOS3_carlos_jimenez.jpg", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Dolores Sánchez Caldentey", 
						"foto": "PODEMOS4_mariadolores_sanchez.jpg", 
						"sexo": "M" 
					},
					{ 
						"nome": "Pablo Echenique Robba", 
						"foto": "PODEMOS5_pablo_echenique.jpg", 
						"sexo": "V" 
					}
				]		
			},
			{ 
				"partido": "UPyD", 
				"candidatos": [ 
					{ 
						"nome": "Francisco Sosa Wagner", 
						"foto": "UPYD1_francisco_sosa.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Teresa Pagazaurtundúa Ruiz", 
						"foto": "UPYD2_maite_pagazaurtundua.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Fernando Maura Barandiarán", 
						"foto": "UPYD3_fernando_maura.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Beatriz Becerra Basterrechea", 
						"foto": "UPYD4_beatriz_becerra.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Enrique Calvet Chambon", 
						"foto": "UPYD5_enrique_calvet.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "María Teresa Giménez Barbat", 
						"foto": "UPYD6_teresa_gimenez.png", 
						"sexo": "M" 
					}
				]		
			},
			{ 
				"partido": "CEU", 
				"candidatos": [ 
					{ 
						"nome": "Ramón Tremosa i Balcells", 
						"foto": "CPE1_ramon_tremosa.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Izaskun Bilbao Barandica", 
						"foto": "CPE2_izaskun_bilbao.png", 
						"sexo": "M" 
					},
					{ 
						"nome": "Francesc de Paula Gambús i Millet", 
						"foto": "CPE3_francesc_gambus.png", 
						"sexo": "V" 
					}
				]		
			},
			{ 
				"partido": "EPDD", 
				"candidatos": [ 
					{ 
						"nome": "Josep María Terricabras i Nogueras", 
						"foto": "ERC1_josep_terricabras.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Ernest Maragall i Mira", 
						"foto": "ERC2_ernest_maragall.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Jordi Solé i Ferrando", 
						"foto": "ERC3_jordi_sole.png", 
						"sexo": "V" 
					}
				
				]		
			},
			{ 
				"partido": "CS", 
				"candidatos": [ 
					{ 
						"nome": "Javier Nart Peñalver", 
						"foto": "C1_javier_nart.png", 
						"sexo": "V" 
					},
					{ 
						"nome": "Juan Carlos Girauta Vidal", 
						"foto": "C2_juan_girauta.png", 
						"sexo": "V" 
					}
				]		
			},
			{ 
				"partido": "PE", 
				"candidatos": [ 
					{ 
						"nome": "Jordi Sebastià Talavera", 
						"foto": "PRIMAVERA1_jordi_sebastia.png", 
						"sexo": "V" 
					}
					
				]		
			},
			{ 
				"partido": "LPD", 
				"candidatos": [ 
					{ 
						"nome": "Josu Juaristi Abaunz", 
						"foto": "BILDU1_josu_juaristi.png", 
						"sexo": "V" 
					}
				]		
			},
			{ 
				"partido": "VOX", 
				"candidatos": [ 
					{ 
						"nome": "Alejo Vidal-Quadras Roca", 
						"foto": "VOX1_alejo_vidalquadras.png", 
						"sexo": "V" 
					}
					
				]		
			},
		];

		var persoas = {};

		$.each(data, function (k, partido) {
			if (!escanos[partido.partido]) {
				return;
			}

			persoas[partido.partido] = {
				partido: partido.partido,
				persoas: partido.candidatos.slice(0, escanos[partido.partido])
			};
		});

		var text = '';

		$.each(persoas, function (k, partido) {
			text += '<li>' + '<h2>' + partido.partido + '</h2><div>';
				$.each(partido.persoas, function (kk, persoa) {
					text += '<span data-par="' + k + '" data-per="' + kk + '" title="' + persoa.nome + '" class="genero-'  + persoa.sexo + '"><img width="50" height="50" src="/escanos/fotos_candidatos/'+ persoa.foto +'"></span>';
				});
				text += '</div></li>';
		});

		$('#lista-escanos').html(text);

		$('#filtro button').on('click', function () {
			var $span = $('#lista-escanos').find('span').css('opacity', '1');
			var filter = $(this).data('filter');

			if (filter) {
				$span.not(filter).css('opacity', '0.1');
			}
		});

		$('#lista-escanos').on('click', 'span', function () {
			var $this = $(this);
			var partido = persoas[$this.data('par')];
			
			if (partido) {
				var persoa = partido.persoas[$this.data('per')];

				var texto = '<div class="persoa">';
				texto += '<img width="150" height="150" src="/escanos/fotos_candidatos/'+ persoa.foto +'">';
					texto += '<h3>' + persoa.nome + '</h3>';
					texto += '<p>' + partido.partido + '</p>';
				texto += '</div>';
				modal.abrirHtml(texto);
			}

		});
	});
});
