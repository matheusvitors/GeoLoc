import React from "react";
import Navigator from './src/routes';

export default function App() {
	//código para ver todas as requisições no network do navegador
    XMLHttpRequest = (global as any).originalXMLHttpRequest || (global as any).XMLHttpRequest;

	return <Navigator />;
}

