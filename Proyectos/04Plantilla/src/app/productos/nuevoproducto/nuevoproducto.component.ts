import { ProductoService } from './../../Services/productos.service';
import { IvaService } from './../../Services/iva.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { Iiva } from 'src/app/Interfaces/iva';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaIva: Iiva[] = [];
  frm_Producto: FormGroup;
  idProducto = 0;
  titulo = 'Nuevo Producto';
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaService: IvaService,
    private productoService: ProductoService,
    private ruta: ActivatedRoute,
    private navegacion: Router,
  ) {}
  ngOnInit(): void {
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaService.todos().subscribe((data) =>(this.listaIva = data));

    this.idProducto = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.crearFormulario();

    if (this.idProducto > 0) {
      this.productoService.uno(this.idProducto).subscribe((unProducto) => {
        console.log(unProducto);
        

        this.frm_Producto.controls['Codigo_Barras'].setValue(unProducto.Codigo_Barras);
        this.frm_Producto.controls['Nombre_Producto'].setValue(unProducto.Nombre_Producto);
        this.frm_Producto.controls['Graba_IVA'].setValue(unProducto.Graba_IVA);
        this.frm_Producto.controls['Unidad_Medida_idUnidad_Medida'].setValue(unProducto.Unidad_Medida_idUnidad_Medida);
        this.frm_Producto.controls['IVA_idIVA'].setValue(unProducto.IVA_idIVA);

        this.frm_Producto.controls['Cantidad'].setValue(unProducto.Cantidad);
        this.frm_Producto.controls['Valor_Compra'].setValue(unProducto.Valor_Compra);
        this.frm_Producto.controls['Valor_Venta'].setValue(unProducto.Valor_Venta);
        this.frm_Producto.controls['Proveedores_idProveedores'].setValue(unProducto.Proveedores_idProveedores);

        this.titulo = 'Editar Producto';
      });
    }

  }

  crearFormulario() {
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', this.idProducto > 0 ? null : Validators.required),
      IVA_idIVA: new FormControl('', this.idProducto > 0 ? null : Validators.required),
      Cantidad: new FormControl('', this.idProducto > 0 ? null : [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', this.idProducto > 0 ? null : [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', this.idProducto > 0 ? null : [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', this.idProducto > 0 ? null : Validators.required)
    });
  }


  grabar() {
    let iProducto: IProducto = {
      idProductos: 0,
      Codigo_Barras: this.frm_Producto.get('Codigo_Barras')?.value,
      Nombre_Producto: this.frm_Producto.get('Nombre_Producto')?.value,
      Graba_IVA: this.frm_Producto.get('Graba_IVA')?.value,
      Unidad_Medida_idUnidad_Medida: this.frm_Producto.get('Unidad_Medida_idUnidad_Medida')?.value, //tabla unidadmedida
      IVA_idIVA: this.frm_Producto.get('IVA_idIVA')?.value, //tabla   IVA
      Cantidad: this.frm_Producto.get('Cantidad')?.value,
      Valor_Compra: this.frm_Producto.get('Valor_Compra')?.value,
      Valor_Venta: this.frm_Producto.get('Valor_Venta')?.value,
      Proveedores_idProveedores: this.frm_Producto.get('Proveedores_idProveedores')?.value, // tabla  proveedor
    };

    console.log(iProducto);
   if (this.idProducto == 0 || isNaN(this.idProducto)) {
      this.productoService.insertar(iProducto).subscribe((respuesta) => {
        // parseInt(respuesta) > 1 ? alert('Grabado con exito') : alert('Error al grabar');
        if (parseInt(respuesta) > 1) {
          alert('Grabado con exito');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al grabar');
        }
      });
    } else {
      iProducto.idProductos = this.idProducto;
      this.productoService.actualizar(iProducto).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          this.idProducto = 0;
          alert('Actualizado con exito');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al actualizar');
        }
      });
    }
  }
}
