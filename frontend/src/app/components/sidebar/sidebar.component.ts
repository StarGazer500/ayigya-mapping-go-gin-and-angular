import { Component, EventEmitter, Input,signal, output,AfterViewInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SelectorfeaturlayersService } from '../../service/selectorfeaturlayers.service';
import {SelectoratrributesService } from '../../service/selectoratrributes.service'
import {SelectoroperatorsService} from '../../service/selectoroperators.service'
import {FechallfeaturelayersService} from '../../service/fechallfeaturelayers.service'
import {FetchspecificvalueService} from '../../service/fetchspecificvalue.service'
import {FechfeaturelayerspecificattributeService} from '../../service/fechfeaturelayerspecificattribute.service'
import {FetchspecificlayerService} from '../../service/fetchspecificlayer.service'






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
    private allfeaturelayers: FechallfeaturelayersService,
    private specificvalueservice: FetchspecificvalueService,
    private attributeservice: FechfeaturelayerspecificattributeService,
    private speciflayerservice: FetchspecificlayerService
  ) {}

  @Input() isSidebarCollapsed = false;
 
  selectorfeaturlayers = signal([]);
  selectorattributes = signal([]);
  selectoroperators = signal([]);

  selectedLayer: string = 'All Feature Layers';
  selectedAttribute:string = 'None'
  selectedOperator:string = 'None'
  queryValue:string = ''

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

    private fetchFeatureLayerByAtrribute(layer:string,attribute:string) {
      this.attributeservice.querySpecficFeatureLayerbyAttribute(layer,attribute).subscribe({
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

    private fetchSpecificFeatureLayer(layer:string) {
      this.speciflayerservice.querySpecficFeatureLayer(layer).subscribe({
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

    private fetchDataBySpecificValue(layer:string,attribute:string,operator:string,value:string
    ) {
      this.specificvalueservice.queryDataBySpecificValue(layer,attribute,operator,value).subscribe({
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
      this.selectedAttribute = selectedattribute
      this.querySideBarOperatorOptions(this.selectedLayer,selectedattribute)
      console.log('Selected attributes:', this.selectedAttribute);
      // Add your logic here
    }

    onOperatorSelect(event:Event){
      const selectedOperator = (event.target as HTMLSelectElement).value;
      this.selectedOperator = selectedOperator
    
      // console.log('Selected attributes:', this.selectorattributes());
      // Add your logic here

    }

    onKey(event: KeyboardEvent) {
      this.queryValue = (event.target as HTMLInputElement).value;
      // console.log(inputValue);  // Log the input value to the console (optional)
    }

    onSubmitQueryClick() {
      // this.fetchAllFeatureLayers()
      this.handleSubmit()
      // console.log('Button clicked!');
      
      // You can add any other logic her
    }

    handleSubmit() {
      if (this.selectedLayer==='All Feature Layers' ){
        if (this.selectedAttribute ==='None' && this.selectedOperator==='None' && this.queryValue===''){
          this.fetchAllFeatureLayers()
        console.log("Search for all layers")
        }else{
          console.log("Selecting All Feature Layers requres other entries to be empty")
        }
      }
      else if(this.selectedLayer!=='All Feature Layers'){
          if (this.selectedAttribute ==='None' && this.selectedOperator==='None' && this.queryValue===''){
            this.fetchSpecificFeatureLayer(this.selectedLayer)
            console.log("seach for a specific layer")
          }else if (this.selectedAttribute !=='None' && this.selectedOperator==='None' && this.queryValue===''){
            this.fetchFeatureLayerByAtrribute(this.selectedLayer,this.selectedAttribute)
            console.log("search for a specific attribute in layer")
          } else if( this.selectedAttribute !=='None' && this.selectedOperator!=='None' && this.queryValue!==''){
            this.fetchDataBySpecificValue(this.selectedLayer,this.selectedAttribute,this.selectedOperator,this.queryValue)
            console.log("searc for value")
          }else if (this.selectedAttribute !=='None' && this.selectedOperator!=='None' && this.queryValue===''){
            console.log("The selected parameters require you to enter search value")
          }else if (this.selectedAttribute !=='None' && this.selectedOperator!=='None' && this.queryValue===''){
            console.log("The selected parameters require you to enter search value")
          }else if (this.selectedAttribute !=='None' && this.selectedOperator==='None' && this.queryValue!==''){
            console.log("The selected parameters require you to choose an operation type")
          }else if (this.selectedAttribute ==='None' && this.selectedOperator!=='None' && this.queryValue!==''){
            console.log("The selected parameters require you to choose an attribute")
          }else{
            console.log("unhandled query Your parameters may be wrong, correct them")
          }
        
      }else{
        console.log("Something went wrong")
      }
     
    }
 
  
}