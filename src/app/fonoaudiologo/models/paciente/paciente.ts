import { Model } from '../../../grid-view/model';
export class Paciente implements Model{
	constructor(
	
		public nome?: string,
		public telefone?: string,
		public email?: string
		){}

	// constructor(){}

	labels(){
		return [
			{'nome':'Nome'},
			{'telefone':'Telefone'},
			{'email':'E-mail'},
		];
	}
}