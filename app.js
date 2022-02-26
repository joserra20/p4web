const cargarGasolineras = async() => {
	try {
		const respuesta = await fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/1782`);

		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			const gasolineras = datos.ListaEESSPrecio;
			console.log(gasolineras);
			$(document).ready(function() {
				$('#example').DataTable( {
					 data: gasolineras,
					 columns: [
						{ title: 'Nombre', data: 'Rótulo' },
						{ title: 'Dirección', data: 'Dirección' },
						{ title: 'Municipio', data: 'Municipio' },
						{ title: 'SP 95', data: 'Precio Gasolina 95 E5' }
					 ] ,
					 "language": {
						"decimal":        "",
						"emptyTable":     "No hay datos disponibles",
						"info":           "Mostrando _START_ a _END_ de _TOTAL_ gasolineras",
						"infoEmpty":      "Mostrando 0 a 0 de 0 gasolineras",
						"infoFiltered":   "(filtrado a partir de _MAX_ gasolineras)",
						"infoPostFix":    "",
						"thousands":      ",",
						"lengthMenu":     "Mostrar _MENU_ gasolineras por página",
						"loadingRecords": "Cargando...",
						"processing":     "Procesando...",
						"search":         "Buscar:",
						"zeroRecords":    "No se han encontrado gasolineras que coincidan con la busqueda",
						"paginate": {
							 "first":      "Primero",
							 "last":       "Último",
							 "next":       "Siguiente",
							 "previous":   "Anterior"
						},
						"aria": {
							 "sortAscending":  ": activate to sort column ascending",
							 "sortDescending": ": activate to sort column descending"
						}
				  }
				} );
		  } );

			let html = '';
			gasolineras.forEach(gasolinera => {
				html += `
					<div class="gasolinera">
						<img class="logo" src="https://logo.clearbit.com/${gasolinera.Rótulo}.com" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/234/234789.png'">
						<h3 class="titulo">${gasolinera.Rótulo}</h3>
						<p>${gasolinera.Dirección}</p>
						<p><strong>SP95</strong> ${gasolinera["Precio Gasolina 95 E5"]}</p>
						<p><strong>SP98</strong> ${gasolinera["Precio Gasolina 98 E5"]}</p>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = html;

		} else if(respuesta.status === 404){
			console.log('La gasolinera que buscas no existe');
		} else {
			console.log('Hubo un error');
		}

	} catch(error){
		console.log(error);
	}

}

const cargarGasolinerasProvincia = async(codigoProvincia) => {
	try {
		const respuesta = await fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${codigoProvincia}`);

		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			const gasolineras = datos.ListaEESSPrecio;
			console.log(gasolineras);
		// 	if ($.fn.dataTable.isDataTable('#example')) {
		// 		$('#example').DataTable().destroy();
		//   }
		// 	$('#example').DataTable( {
		// 		responsive: true,
		// 		 data: gasolineras,
		// 		 select: true,
		// 		 columns: [
		// 			{ title: 'Nombre', data: 'Rótulo' },
		// 			{ title: 'Dirección', data: 'Dirección' },
		// 			{ title: 'Municipio', data: 'Municipio' },
		// 			{ title: 'SP 95', data: 'Precio Gasolina 95 E5' },
		// 			{ title: 'SP 98', data: 'Precio Gasolina 98 E5' },
		// 			{ title: 'Diesel', data: 'Precio Gasoleo A' },
		// 			{ title: 'Diesel+', data: 'Precio Gasoleo Premium' }
		// 		 ] ,
		// 		 "language": {
		// 			"decimal":        "",
		// 			"emptyTable":     "No hay datos disponibles",
		// 			"info":           "Mostrando _START_ a _END_ de _TOTAL_ gasolineras",
		// 			"infoEmpty":      "Mostrando 0 a 0 de 0 gasolineras",
		// 			"infoFiltered":   "(filtrado a partir de _MAX_ gasolineras)",
		// 			"infoPostFix":    "",
		// 			"thousands":      ",",
		// 			"lengthMenu":     "Mostrar _MENU_ gasolineras por página",
		// 			"loadingRecords": "Cargando...",
		// 			"processing":     "Procesando...",
		// 			"search":         "Buscar:",
		// 			"zeroRecords":    "No se han encontrado gasolineras que coincidan con la busqueda",
		// 			"paginate": {
		// 				 "first":      "Primero",
		// 				 "last":       "Último",
		// 				 "next":       "Siguiente",
		// 				 "previous":   "Anterior"
		// 			},
		// 			"aria": {
		// 				 "sortAscending":  ": activate to sort column ascending",
		// 				 "sortDescending": ": activate to sort column descending"
		// 			}
		// 	  }
		// 	} );
			var table = $('#example').DataTable();
			table.clear().draw();
			table.rows.add(gasolineras);
			table.columns.adjust().draw();
				
			let html = '';
			gasolineras.forEach(gasolinera => {
				html += `
					<div class="gasolinera">
						<img class="logo" src="https://logo.clearbit.com/${gasolinera.Rótulo}.com" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/234/234789.png'">
						<h3 class="titulo">${gasolinera.Rótulo}</h3>
						<p>${gasolinera.Dirección}</p>
						<p><strong>SP95</strong> ${gasolinera["Precio Gasolina 95 E5"]}</p>
						<p><strong>SP98</strong> ${gasolinera["Precio Gasolina 98 E5"]}</p>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = html;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La gasolinera que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

const cargarProvincias = async() => {
	try {
		const respuesta = await fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/`);

		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			console.log(datos);
			$.each(datos, function (i, item) {
				$('#selectProvincias').append($('<option>', { 
					 val: item.IDPovincia,
					 text : item.Provincia 
				}));
		  });

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La gasolinera que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

const inicializarTabla = () => {
	var gasolineras;
	$('#example').DataTable( {
		responsive: true,
		 data: gasolineras,
		 select: true,
		 columns: [
			{ title: 'Nombre', data: 'Rótulo' },
			{ title: 'Dirección', data: 'Dirección' },
			{ title: 'Municipio', data: 'Municipio' },
			{ title: 'SP 95', data: 'Precio Gasolina 95 E5' },
			{ title: 'SP 98', data: 'Precio Gasolina 98 E5' },
			{ title: 'Diesel', data: 'Precio Gasoleo A' },
			{ title: 'Diesel+', data: 'Precio Gasoleo Premium' }
		 ] ,
		 "language": {
			"decimal":        "",
			"emptyTable":     "No hay datos disponibles",
			"info":           "Mostrando _START_ a _END_ de _TOTAL_ gasolineras",
			"infoEmpty":      "Mostrando 0 a 0 de 0 gasolineras",
			"infoFiltered":   "(filtrado a partir de _MAX_ gasolineras)",
			"infoPostFix":    "",
			"thousands":      ",",
			"lengthMenu":     "Mostrar _MENU_ gasolineras por página",
			"loadingRecords": "Cargando...",
			"processing":     "Procesando...",
			"search":         "Buscar:",
			"zeroRecords":    "No se han encontrado gasolineras que coincidan con la busqueda",
			"paginate": {
				 "first":      "Primero",
				 "last":       "Último",
				 "next":       "Siguiente",
				 "previous":   "Anterior"
			},
			"aria": {
				 "sortAscending":  ": activate to sort column ascending",
				 "sortDescending": ": activate to sort column descending"
			}
	  }
	} );

		let table = $('#example').DataTable();

		$('#example tbody').on( 'click', 'tr', function () {
			mostrarInfo(table.row( this ).data());
		} );

}

const mostrarInfo = (gasolinera) => {
	$("#info").html(`
	<h5>Última gasolinera seleccionada</h5>
	<img class="logo" width="100" src="https://logo.clearbit.com/${gasolinera.Rótulo}.com" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/234/234789.png'">
	<h3 class="titulo">${gasolinera.Rótulo}</h3>
	<p>${gasolinera.Dirección}</p>
	<p><strong>SP95</strong> ${gasolinera["Precio Gasolina 95 E5"]}</p>
	<p><strong>SP98</strong> ${gasolinera["Precio Gasolina 98 E5"]}</p>`);
	$("#info").show();


	let str = `
	<div class="row">
	<div class="col-md-4">
	  <img class="logo mx-auto d-block" width="100" src="https://logo.clearbit.com/${gasolinera.Rótulo}.com" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/234/234789.png'">
	</div>
	<div class="col-md-6">
	  <h3 class="titulo">${gasolinera.Rótulo}</h3>
	  <p>${gasolinera.Dirección}</p>
	  <p class="font-weight-bold">${gasolinera.Municipio}</p>
	  <p class="font-weight-bold">${gasolinera.Provincia}</p>
	  <p>Horario: ${gasolinera.Horario}</p>
	</div>
</div>
<div class="row">
  <div class="col-md-4">
	  <h6>Gasolina</h6>
	  <p><strong>SP95 E5</strong> ${gasolinera["Precio Gasolina 95 E5"]}</p>
	  <p><strong>SP98 E5</strong> ${gasolinera["Precio Gasolina 98 E5"]}</p>
	</div>
	<div class="col-md-6">
	  <h6>Diesel</h6>
	  <p><strong>Gasoleo A</strong> ${gasolinera["Precio Gasoleo A"]}</p>
	  <p><strong>Gasoleo Premium</strong> ${gasolinera["Precio Gasoleo Premium"]}</p>
	  <p><strong>Gasoleo B</strong> ${gasolinera["Precio Gasoleo B"]}</p>
	</div>
  
</div>
	`
	$("#mensaje").html(str);
	$('#exampleModal').modal('show');
}

$("#selectProvincias").on('change', function() {
	$("#titulo-tabla").html("Tabla con filtrado");
	$('#containerTabla').show();
	$("#titulo-cajas").html("Datos en forma de cajas");
	cargarGasolinerasProvincia($(this).val());
});

// cargarGasolineras();
$("#info").hide();
$('#containerTabla').hide();
cargarProvincias();
inicializarTabla();

