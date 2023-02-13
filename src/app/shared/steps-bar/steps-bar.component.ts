import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-steps-bar',
  templateUrl: './steps-bar.component.html',
  styleUrls: ['./steps-bar.component.css']
})
export class StepsBarComponent {
  @Input() numberstep = 1;
  @Input() nameEntity = '';

   getClass(classStep : number){
    try
    {
      if (classStep==this.numberstep)
      { 
        if (classStep==1)     
        {
          return "col-md-auto gSteps rounded";
        }
        else
        {
          return "col-md-auto gSteps  rounded";
        }        
      } 
      else
      {
          return "col-md-auto";
      }
    }catch(error)     
    {
      console.log(error);
      return "col-md-auto";
    }
  }

  getClassIcon(classStep : number){
    try
    {  
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
    }catch(error)     
    {
      console.log(error);
      return "bi bi-1-circle complete";
    }
  }

  getClassText(classStep : number){
    try
    {  
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
    }catch(error)     
    {
      console.log(error);
      return "ft14b";
    }
  }
}

