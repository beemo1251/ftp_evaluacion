import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public movimientos: any[] = [];
  public movimiento = {
    codigo_unico: '',
    fecha: '',
    descripcion: '',
    monto: ''
  }
  public closeResult = '';
  private tipo_cambio = [{'fecha':'2023-05-28','venta':3.675,'compra':3.671},{'fecha':'2023-05-29','venta':3.678,'compra':3.674},{'fecha':'2023-05-30','venta':3.68,'compra':3.667}];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  actionFile(event: HTMLInputElement) {
    let file = event.files![0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = e.target?.result as string;
      const filas = data?.split(/\r?\n|\r/);
      filas.forEach(e => {
        let value = e.split(',');
        var obj = {
          fecha: value[0],
          descripcion: value[1],
          moneda: value[2],
          monto: this.convertSoles(value[2], Number(value[3]), value[0]),
          codigo_unico: value[4]
        }
        this.movimientos.push(obj);
      });
    }
    reader.readAsText(file);
  }

  convertSoles(moneda: string, monto: number, fecha: string): number {
    if (moneda.match('USD')) {
      let cambio = null;
      cambio = this.tipo_cambio.filter(m => m.fecha.match(fecha));
      return monto * Number(cambio[0].venta);
    } else {
      return monto
    }
  }

  open(content: any, codigo: string) {
    let element = this.movimientos.filter(a => a.codigo_unico.match(codigo));
    this.movimiento.codigo_unico = element[0].codigo_unico;
    this.movimiento.fecha = element[0].fecha;
    this.movimiento.descripcion = element[0].descripcion;
    this.movimiento.monto = element[0].monto;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  save() {
    for (let i = 0; i < this.movimientos.length; i++) {
      if (this.movimientos[i].codigo_unico.match(this.movimiento.codigo_unico)){
        this.movimientos[i].codigo_unico = this.movimiento.codigo_unico;
        this.movimientos[i].fecha = this.movimiento.fecha;
        this.movimientos[i].descripcion = this.movimiento.descripcion;
        this.movimientos[i].monto = this.movimiento.monto;
      }
    }
  }

  trash(codigo: any) {
    this.movimientos = this.movimientos.filter(a => !a.codigo_unico.match(codigo));
  }

}
