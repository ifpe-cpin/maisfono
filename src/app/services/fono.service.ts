import { Injectable } from '@angular/core';

import { FONO } from '../mocks/mock-fono';
import { Fono } from '../fonoaudiologo/models/fono/fono';


@Injectable()
export class FonoService {

	getFono(){
		return FONO;
	}

	setFono(fono: Fono){
		FONO.push(fono);
	}
}