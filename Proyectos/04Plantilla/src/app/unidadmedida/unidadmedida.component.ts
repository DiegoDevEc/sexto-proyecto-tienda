import { Component, OnInit } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent implements OnInit {
  listaunidades: IUnidadMedida[] = [];

  constructor(private unidadServicio: UnidadmedidaService) {}
  ngOnInit(): void {
    this.cargatabla();
  }

  cargatabla(){
    this.unidadServicio.todos().subscribe((data) => {
      this.listaunidades = data;
    });
  }

  eliminar(idUnidad_Medida: number) {
    console.log("undiad");
    console.log(idUnidad_Medida);
    
    
    Swal.fire({
      title: 'Unidad de Medida',
      text: 'Esta seguro que desea eliminar la unidad de medida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Unidad de Medida'
    }).then((result) => {
      if (result.isConfirmed) {
        this.unidadServicio.eliminar(idUnidad_Medida).subscribe((data) => {
          let mensaje =  'La unidad de medida ha sido eliminada.';
          if(data.toString().startsWith("Cannot delete or update a parent row")){
                mensaje = 'La unidad de medida no puede ser eliminada, existen productos relacionados';
          }
          Swal.fire('Unidad de Medida', mensaje, 'success');
          this.cargatabla();
        });
      }
    });
  }
}
