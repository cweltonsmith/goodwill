let loginfunc = async function apifunc(){

	const response = await fetch('https://goodwillomaha-nw2020.azurewebsites.net/')
	const myJson = await response.json();
    
	
}

document.querySelector('#getLoginInformation').addEventListener('click', loginfunc);