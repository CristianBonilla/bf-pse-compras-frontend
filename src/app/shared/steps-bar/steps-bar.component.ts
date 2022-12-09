import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-steps-bar',
  templateUrl: './steps-bar.component.html',
  styleUrls: ['./steps-bar.component.css']
})
export class StepsBarComponent {
  @Input() numberstep = 1;

   getClass(classStep : number){
  
    if (classStep==this.numberstep)
    { 
       if (classStep==1)     
       {
        return "col-xs-3 col-sm-3 col-md-3 gSteps g-2 my-2 rounded";
       }
       else
       {
        return "col-xs-3 col-sm-3 col-md-3 gSteps g-2 m-2 rounded";
       }        
    } 
    else
    {
        return "col-xs-3 col-sm-3 col-md-3 g-2 m-2 border rounded";
    }
  }

  getClassIcon(classStep : number){
  
    if (classStep==1)
    {      
       if (this.numberstep==classStep)
       {
          return "bi bi-1-circle";
       }
       else
       {
        return "bi bi-1-circle complete";
       }        
    }  
    else if (classStep==2)
    {
      if (this.numberstep>classStep)
      {
        return "bi bi-2-circle complete";
      }
      else
      {
        return "bi bi-2-circle";
      }
    }
    else 
    {
      if (this.numberstep>classStep)
      {
        return "bi bi-3-circle complete";
      }
      else
      {
        return "bi bi-3-circle";
      }
    }
  }

  getClassText(classStep : number){
  
    if (classStep==this.numberstep)
    {      
       return "ft14w";
    }    
    else
    {
      if (classStep==3)
      {
        return "text-left ft14b";
      }
      else
      {
        return "ft14b";
      }      
    }
  }
}

