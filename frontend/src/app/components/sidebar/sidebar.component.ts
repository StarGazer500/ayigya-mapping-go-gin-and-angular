import { Component, EventEmitter, Input,signal, output,AfterViewInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SelectorfeaturlayersService } from '../../service/selectorfeaturlayers.service';
import {SelectoratrributesService } from '../../service/selectoratrributes.service'
import {SelectoroperatorsService} from '../../service/selectoroperators.service'
import {FechallfeaturelayersService} from '../../service/fechallfeaturelayers.service'





@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit{

  constructor(
    private selectorService: SelectorfeaturlayersService,
    private attributeselector:SelectoratrributesService,
    private operatorselector:SelectoroperatorsService, 
    private allfeaturelayers: FechallfeaturelayersService
  ) {}

  @Input() isSidebarCollapsed = false;
 
  selectorfeaturlayers = signal([]);
  selectorattributes = signal([]);
  selectoroperators = signal([]);

  selectedLayer: string = '';

  onDataChange = output<string>();

   ngAfterViewInit() {
      this.querySideBarFeatureLayersOptions();
      // console.log("data above",this.data1)
      
    }
  
    private querySideBarFeatureLayersOptions() {
      this.selectorService.querySelectorFeatureLayers().subscribe({
        next: (data) => {
          // console.log('Feature layers:', );
          // this.data1 = data
          // Process data here
          this.selectorfeaturlayers.set(Object.values(data.data))
          console.log("signal data",this.selectorfeaturlayers())

        },
        error: (error) => {
          console.error('Error fetching layers', error);
        }
      });
    }

    private querySideBarAttributesOptions(layer:string) {
      this.attributeselector.querySelectorAttributes(layer).subscribe({
        next: (data) => {
          // console.log('Feature layers:', );
          // this.data1 = data
          // Process data here
          this.selectorattributes.set(Object.values(data.data))
          // console.log("attributes signal data",this.selectorattributes())

        },
        error: (error) => {
          console.error('Error fetching layers', error);
        }
      });
    }

    private querySideBarOperatorOptions(layer:string,attribute:string) {
      this.operatorselector.querySelectorOperators(layer,attribute).subscribe({
        next: (data) => {
          // console.log('Feature layers:', );
          // this.data1 = data
          // Process data here
          this.selectoroperators.set(Object.values(data.data))
          console.log("operatores signal data",this.selectoroperators())

        },
        error: (error) => {
          console.error('Error fetching layers', error);
        }
      });
    }

    private fetchAllFeatureLayers() {
      this.allfeaturelayers.queryAllFeatureLayers().subscribe({
        next: (data) => {
          // console.log('Feature layers:', );
          // this.data1 = data
          // Process data here
          // this.selectoroperators.set(Object.values(data.data))
          this.onDataChange.emit(data.data);
          // console.log("operatores signal data",this.selectoroperators())

        },
        error: (error) => {
          console.error('Error fetching layers', error);
        }
      });
    }

    onLayerSelect(event: Event) {
      const selectedLayer = (event.target as HTMLSelectElement).value;
      this.selectedLayer = selectedLayer;
      this.querySideBarAttributesOptions(selectedLayer)
      // console.log('Selected attributes:', this.selectorattributes());
      // Add your logic here
    }

    onAttributeSelect(event: Event) {
      const selectedattribute = (event.target as HTMLSelectElement).value;
      this.querySideBarOperatorOptions(this.selectedLayer,selectedattribute)
      // console.log('Selected attributes:', this.selectorattributes());
      // Add your logic here
    }

    onSubmitQueryClick() {
      this.fetchAllFeatureLayers()
      // console.log('Button clicked!');
      
      // You can add any other logic her
    }
 
  
}