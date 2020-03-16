import React from 'react'

class MastersTheorem extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
             m_RecurrenceEquation: null,
             m_aValue: null,
             m_bValue: null,
             m_dValue: null
        };
        this.HandleClick = this.HandleClick.bind(this);
        this.SolveProblem = this.SolveProblem.bind(this);
        this.ParseEquation = this.ParseEquation.bind(this);
    }

    HandleClick(e)
    {
        document.getElementById("Answer").style.display = "none";
        document.getElementById("Answer").innerHTML = "";
        document.getElementById("ErrorMessage").style.display = "none";
        document.getElementById("ErrorMessage").innerHTML = "";
      
        e.preventDefault();
        this.state.m_RecurrenceEquation = document.getElementById("RecurrenceEquationInput").value + " eol";

        if(this.ParseEquation() == true)
        {   
            this.SolveProblem();
        }
        else 
        {
            document.getElementById("ErrorMessage").innerHTML = "Error: Invalid Format of Recurrence Equation has been detected. Try to format your problem like the provided example.";
            document.getElementById("ErrorMessage").style.display = "block";
        }
    }

    ParseEquation()
    {
        if(this.state.m_RecurrenceEquation != null && this.state.m_RecurrenceEquation != "")
        {
            var StartIndex = this.state.m_RecurrenceEquation.indexOf("=");
            var EndIndex = this.state.m_RecurrenceEquation.indexOf("(", StartIndex);
            var TempString = this.state.m_RecurrenceEquation;
          
            if((StartIndex != -1 && EndIndex != -1) && (StartIndex + 1) <= (EndIndex -1))  //Used to grab and set the a value
            {
                this.state.m_aValue = this.state.m_RecurrenceEquation.slice(StartIndex + 1, EndIndex -1);
                
                this.state.m_aValue.trim();
                if(this.state.m_aValue == "" || this.state.m_aValue == " ")
                {
                    this.state.m_aValue = "1";
                }
                if(this.state.m_aValue.includes("-") || this.state.m_aValue.includes("/") || this.state.m_aValue.includes("\\"))
                {
                    this.state.m_aValue = "-1";
                }
                this.state.m_aValue = parseInt(this.state.m_aValue);
                TempString = TempString.slice(EndIndex, TempString.length);
                
            }
		       	else
		      	{
				      return false;
			      }
              
           
            StartIndex = TempString.indexOf("/");
            EndIndex = TempString.indexOf(")");
          
            if((StartIndex != -1 && EndIndex != -1) && ((StartIndex + 1) <= (EndIndex -1)))
            {
                this.state.m_bValue = TempString.slice(StartIndex + 1 , EndIndex);
                this.state.m_bValue.trim();
                this.state.m_bValue = parseInt(this.state.m_bValue);
                TempString = TempString.slice(EndIndex + 1, TempString.length);
                TempString = TempString.trim();
            }
            else
            {
              this.state.m_bValue = 0;
            }
          
            StartIndex = TempString.indexOf(" ");
            EndIndex = TempString.indexOf("eol");
          
          
            if((StartIndex != -1 && EndIndex != -1) && ((StartIndex + 1) <= (EndIndex -1)))
            {
              TempString = TempString.slice(StartIndex + 1, EndIndex -1);
             
              if((TempString.includes("O(") == true || TempString.includes("o(") == true) && TempString.includes(")")) //Function contains O(value)
              {
                TempString = TempString.slice(TempString.indexOf("(") + 1, TempString.indexOf(")"));
                TempString.trim();
              }
              if(TempString.includes("logn") == true)
              {
                  TempString = TempString.slice(0, TempString.indexOf("logn"));
                  TempString.trim();
                  //alert(TempString);
              }
              
              StartIndex = TempString.indexOf("^");
              
              if(TempString == "n" || TempString == "n^")
              {
                   this.state.m_dValue = 1;   
              }
              else if((TempString.includes("n^") == true || TempString.includes("n ^")) && (TempString.includes("/n") == false|| !TempString.includes("\n") == false))
              {
                this.state.m_dValue = TempString.slice(StartIndex + 1 , TempString.length);
                this.state.m_dValue.trim();
                
                if(this.state.m_dValue.includes("/"))
                {
                  var TempNumber1 = this.state.m_dValue.slice(0, this.state.m_dValue.indexOf("/"));
                  var TempNumber2 = this.state.m_dValue.slice(this.state.m_dValue.indexOf("/") + 1, this.state.m_dValue.length);
                  //alert(TempNumber1 + "   " + TempNumber2);
                  
                  if(isNaN(parseFloat(TempNumber1)) == false && isNaN(parseFloat(TempNumber2)) == false && TempNumber1 != 0 && TempNumber2 != 0)
                  {
                    this.state.m_dValue = parseFloat(parseFloat(TempNumber1) / parseFloat(TempNumber2)).toFixed(2);
                  }
                  else this.state.m_dValue = "-1";
                }
                
                if(this.state.m_dValue.includes("."))
                {
                    this.state.m_dValue = parseFloat(this.state.m_dValue).toFixed(2);
                }
                else
                {
                  this.state.m_dValue = parseInt(this.state.m_dValue);
                }
                
                TempString = TempString.slice(EndIndex, TempString.length);
              }
              else this.state.m_dValue = -1;
              
            }
            else
            {
              return false;
            }
          
            
            return true;
        }
        return false;
    }

    SolveProblem()
    {
      var IncorrectData = false;
      
       if(this.state.m_aValue < 1)
        {
          IncorrectData = true;
          document.getElementById("ErrorMessage").innerHTML =  "Error: Invalid Format of Recurrence Equation has been detected. {The coefficient in front of your recursive function cannot be less than 1}";
       }
      
       if(this.state.m_bValue <= 1)
       {
          IncorrectData = true;
          document.getElementById("ErrorMessage").innerHTML = document.getElementById("ErrorMessage").innerHTML + " <br></br> Error: Invalid Format of Recurrence Equation has been detected. {The number dividing the inside of your recursive function must be greater that 1}";
        }
          
       if(this.state.m_dValue < 0)
       {
          IncorrectData = true;
          document.getElementById("ErrorMessage").innerHTML = document.getElementById("ErrorMessage").innerHTML + " <br></br> Error: Invalid Format of Recurrence Equation has been detected. {The f(n) part of your equation is not considered to be monotonic}";
        
       }
      
      if(IncorrectData != true)
      {
         if(this.state.m_aValue < Math.pow(this.state.m_bValue, this.state.m_dValue)) // a < b^d == O(n^d)
         {
            document.getElementById("Answer").innerHTML = "Answer: O(n" + this.state.m_dValue.toString().sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
         }
         else if(this.state.m_aValue == Math.pow(this.state.m_bValue, this.state.m_dValue))
         {
            document.getElementById("Answer").innerHTML = "Answer: O(n" + this.state.m_dValue.toString().sup() + "logn)"; 
            document.getElementById("Answer").style.display = "block";
         }
         else
         {
            document.getElementById("Answer").innerHTML = "Answer: O(n" + ("log" + this.state.m_dValue.toString().sub() + " " + this.state.m_aValue).sup() + ")"; 
            document.getElementById("Answer").style.display = "block";
         }
            
        return;
      }
      document.getElementById("ErrorMessage").style.display = "block";
      
      return;
    }

  
  
  
    render()
    {
        return (
            <div id = "Main">
                <div id = "TitleBar">
                    <h2 id = "Title"> 
                        <a id="Hyperlink" href=".">
                            Master's Theorem 
                        </a>
                    </h2>
                    <p>
                      Enter a valid Recurrence Equation in order to solve it using Master's theorem. Press the 'Submit' button 
                      <br></br> to get your answer. <br></br><br></br> Ex: S(n) = 2S(n/4) + n^2
                      
                    </p>
                 </div> 
            

                <form id = "RecurrenceEquationForm">
                    <label>
                         Recurrence Equation:{' '}
                        <input id= "RecurrenceEquationInput"> 
                        
                        </input>
                         {'  '}
                      
                        <button id = "SubmitButton"  onClick = {this.HandleClick}>
                           Submit
                        </button>
                      
                    </label>
                </form>
				
			      	 <div id = "Output" style={{display: "block", color: "black"}}>
					         <label id = "ErrorMessage" style={{display: "none", color:"red"}}>
						            
					         </label>
                 
                   <label id = "Answer" style={{display: "none", color: "black", fontsize: "15px"}}>
                        Answer
                   </label>
				       </div>
                
          </div>
        )
    }
}

ReactDOM.render(
<MastersTheorem />,
 document.getElementById('root')
 );

 //Author: William Blackburn
 //CS499- Senior Design
 //MastersTheorem.js - Used to solve Recurrence Equations using Master's Theorem