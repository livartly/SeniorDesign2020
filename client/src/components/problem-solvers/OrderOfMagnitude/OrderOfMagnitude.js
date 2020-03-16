import React from 'react'

class OrderOfMagnitude extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
             m_FunctionF: "null",
             m_FunctionG: "null",
             m_C1: 0,
             m_C2: 0,
             m_N : 0,
        };
        this.HandleClick = this.HandleClick.bind(this);
        this.SolveProblem = this.SolveProblem.bind(this);
        this.ParseEquation = this.ParseEquation.bind(this);
    }

    HandleClick(e)
    {
        document.getElementById("ErrorMessage").style.display = "none";
        document.getElementById("ErrorMessage").innerHTML = "";
        e.preventDefault();
      
        this.state.m_FunctionF = document.getElementById("FunctionF").value;
        this.state.m_FunctionG = document.getElementById("FunctionG").value;

        if((this.state.m_FunctionF == "" || this.state.m_FunctionF == null) || this.state.m_FunctionG == "" || this.state.m_FunctionG == null)
        {
            document.getElementById("ErrorMessage").innerHTML = "Error: Must fill out both f(x) and g(x) forms before submitting!";
            document.getElementById("ErrorMessage").style.display = "block";
        }
        else 
        {
          this.state.m_FunctionF = this.state.m_FunctionF.trim();
          this.state.m_FunctionG = this.state.m_FunctionG.trim();
          
          this.ParseEquation()
        }
    }

    ParseEquation()
    {
      var tempEquationFx = this.state.m_FunctionF
      var tempEquationGx = this.state.m_FunctionG
      var WordSegmentsFx = []
      var WordSegmentsGx = []
     
      if(tempEquationFx.includes('='))
       {
          tempEquationFx = tempEquationFx.slice(tempEquationFx.indexOf('=') + 1, tempEquationFx.length).trim()
       }
       if(tempEquationGx.includes('='))
       {
          tempEquationGx = tempEquationGx.slice(tempEquationGx.indexOf('=') + 1, tempEquationGx.length).trim()
       }
      
      while(tempEquationFx.includes('+') || tempEquationFx.includes('-'))
       {
          var StartIndex = 0
          var EndIndex = -1
              
          EndIndex = tempEquationFx.indexOf('+')
          if(EndIndex != -1)
          {
            WordSegmentsFx.push(tempEquationFx.slice(StartIndex, EndIndex - 1))
            WordSegmentsFx.push("+")
            tempEquationFx = tempEquationFx.slice(EndIndex + 1, tempEquationFx.length)
          }
        
            EndIndex = tempEquationFx.indexOf('-')
            
          if(EndIndex != -1)
           {
              WordSegmentsFx.push(tempEquationFx.slice(StartIndex, EndIndex - 1))
              WordSegmentsFx.push("-")
              tempEquationFx = tempEquationFx.slice(EndIndex + 1, tempEquationFx.length)
           }
          
          EndIndex = -1;
        }
          
      WordSegmentsFx.push(tempEquationFx.trim());
      
      while(tempEquationGx.includes('+') || tempEquationGx.includes('-'))
       {
          var StartIndex = 0
          var EndIndex = -1
              
          EndIndex = tempEquationGx.indexOf('+')
          if(EndIndex != -1)
          {
            WordSegmentsGx.push(tempEquationGx.slice(StartIndex, EndIndex - 1))
            WordSegmentsGx.push("+")
            tempEquationGx = tempEquationGx.slice(EndIndex + 1, tempEquationGx.length)
          }
         
            EndIndex = tempEquationGx.indexOf('-')
            
          if(EndIndex != -1)
           {
              WordSegmentsGx.push(tempEquationGx.slice(StartIndex, EndIndex - 1))
              WordSegmentsGx.push("-")
              tempEquationGx = tempEquationGx.slice(EndIndex + 1, tempEquationGx.length)
           }
          
          EndIndex = -1;
        }
          
      WordSegmentsGx.push(tempEquationGx.trim());
      
      this.SolveProblem(WordSegmentsFx, WordSegmentsGx);
      
    }

    SolveProblem(FxArray, GxArray)  //Will attempt to solve so X > N, 
    {
      var c1 = 0
      var c2 = 0
      var N = 2
      
      alert("TRYING TO SOLVE PROBLEM")
      
      alert(FxArray)
      alert(GxArray)
      
      for(var i = 0; i < FxArray.length; i++)
        {
          FxArray[i] = FxArray[i].trim()
          if(FxArray[i].includes("x"))
           {
             if(FxArray[i].indexOf('x') > 0 && FxArray[i].indexOf('x') + 1 == FxArray[i].length && !FxArray[i].includes("log")) //17x => 17 * N
              {
                FxArray[i] = FxArray[i].replace("x", " * " + N)
              }
             else if(FxArray[i].indexOf('x') >= 0 && FxArray[i].indexOf('x') + 1 < FxArray[i].length && FxArray[i].includes('^') == true) //x^2 => N^2 || logx^2 => logN^2
               {
                 var exponent = FxArray[i].slice(FxArray[i].indexOf('^') + 1, FxArray[i].length) //Grabs and assumes anything after ^ is an exponent statement
                 FxArray[i].slice(0, FxArray[i].indexOf(exponent))
                 
                 if(FxArray[i].indexOf('x') != 0 && !FxArray[i].includes("log"))
                   {
                     FxArray[i].replace('x', "* x");
                   }
                 
                 if(exponent.includes('(') && exponent.includes(')'))
                   {
                    exponent = exponent.slice(1, exponent.length);
                   }
                 
                 if(exponent.includes('/'))
                   {
                     var dividend = exponent.slice(0, exponent.indexOf('/'))
                     var divisor = exponent.slice(exponent.indexOf('/') + 1, exponent.length)
                     
                     dividend = parseFloat(dividend)
                     divisor = parseFloat(divisor)
                     exponent = dividend / divisor
                     
                     FxArray[i] = FxArray[i].replace("x", Math.pow(N, exponent).toString())
                   }
                 else
                   {
                     alert(FxArray[i])
                     exponent = FxArray[i].slice(FxArray[i].indexOf('^') + 1, FxArray[i].length)
                     FxArray[i] = FxArray[i].replace("x", Math.pow(N, exponent).toString()) 
                     alert(FxArray[i])
                   }
                 
                  FxArray[i] = FxArray[i].slice(0, FxArray[i].indexOf('^'))
               }
             else if(FxArray[i].indexOf('x') == 0 && FxArray[i].indexOf('x') + 1 == FxArray[i].length || FxArray[i].includes("log")) //x => N || logx => logN
              {
                FxArray[i] = FxArray[i].replace("x", N)
              }
             else
               {
                  document.getElementById("ErrorMessage").innerHTML = "Error: Incorrect Formatting Detected. Try to format the problem like the example provided";
                  document.getElementById("ErrorMessage").style.display = "block";
                  return false;
               }
           }
           else if(FxArray[i].match(/^[0-9*/+-]+$/) == null)
           {
              document.getElementById("ErrorMessage").innerHTML = "Error: Incorrect Formatting Detected in g(x). Are you using only digits or polynomials consisting of the var x?";
              document.getElementById("ErrorMessage").style.display = "block";
              return false;
           }
        }
      
      alert(GxArray.length)
      for(var i = 0; i < GxArray.length; i++)
        {
          GxArray[i] = GxArray[i].trim()
          if(GxArray[i].includes("x"))
           {
             if(GxArray[i].indexOf('x') > 0 && GxArray[i].indexOf('x') + 1 == GxArray[i].length && !GxArray[i].includes("log")) //17x => 17 * N
              {
                GxArray[i] = GxArray[i].replace("x", " * " + N)
              }
             
             else if(GxArray[i].indexOf('x') >= 0 && GxArray[i].indexOf('x') + 1 < GxArray[i].length && GxArray[i].includes('^') == true) //x^2 => N^2 || logx^2 => logN^2
               {
                 var exponent = GxArray[i].slice(GxArray[i].indexOf('^') + 1, GxArray[i].length) //Grabs and assumes anything after ^ is an exponent statement
                 GxArray[i].slice(0, GxArray[i].indexOf(exponent))
                 
                 if(GxArray[i].indexOf('x') != 0 && !GxArray[i].includes("log"))
                   {
                     GxArray[i].replace('x', "* x");
                   }
                 if(exponent.includes('(') && exponent.includes(')'))
                   {
                    exponent = exponent.slice(1, exponent.length);
                   }
                 
                 if(exponent.includes('/'))
                   {
                     var dividend = exponent.slice(0, exponent.indexOf('/'))
                     var divisor = exponent.slice(exponent.indexOf('/') + 1, exponent.length)
                     
                     dividend = parseFloat(dividend)
                     divisor = parseFloat(divisor)
                     exponent = dividend / divisor
                     
                     GxArray[i] = GxArray[i].replace("x", Math.pow(N, exponent).toString())
                   }
                 else
                   {
                     alert(GxArray[i])
                     exponent = GxArray[i].slice(GxArray[i].indexOf('^') + 1, GxArray[i].length)
                     GxArray[i] = GxArray[i].replace("x", Math.pow(N, exponent).toString()) 
                     alert(GxArray[i])
                   }
                  
                  GxArray[i] = GxArray[i].slice(0, GxArray[i].indexOf('^'))
                 
               }
             else if(GxArray[i].indexOf('x') == 0 && GxArray[i].indexOf('x') + 1 == GxArray[i].length || GxArray[i].includes("log")) //x => N || logx => logN
              {
                    GxArray[i] = GxArray[i].replace("x", N)
              }
             else
               {
                  document.getElementById("ErrorMessage").innerHTML = "Error: Incorrect Formatting Detected. Try to format the problem like the example provided";
                  document.getElementById("ErrorMessage").style.display = "block";
                  return false;
               }
           }
           else if(GxArray[i].match(/^[0-9*/+-]+$/) == null)
           {
              document.getElementById("ErrorMessage").innerHTML = "Error: Incorrect Formatting Detected in g(x). Are you using only digits or polynomials consisting of the var x?";
              document.getElementById("ErrorMessage").style.display = "block";
              return false;
           }
        }
      
      
      for(var i; i < FxArray.length; i++)
        {
               if(FxArray[i].includes("log"))
                {
                   var tempString = FxArray[i].toString().split(FxArray[i].indexOf("log"), FxArray[i].length)
                   var number = parseFloat(FxArray[i].split(FxArray[i].indexOf("log") + 3, FxArray[i].length).toString().trim())
                   
                   FxArray[i].replace(FxArray[i],split(FxArray[i].indexof("log"), FxArray[i].length), Math.log(number))
                }
        }
      
      for(var i; i < GxArray.length; i++)
        {
               if(GxArray[i].includes("log"))
                {
                   var tempString = GxArray[i].toString().split(GxArray[i].indexOf("log"), GxArray[i].length)
                   var number = parseFloat(GxArray[i].split(GxArray[i].indexOf("log") + 3, GxArray[i].length).toString().trim())
                   
                   GxArray[i].replace(GxArray[i],split(GxArray[i].indexof("log"), GxArray[i].length), Math.log(number))
                }
        }
      
      
      alert(FxArray)
      alert(GxArray)
      
    }

    render()
    {
        return (
            <div id = "Main">
                <div id = "TitleBar">
                    <h2 id = "Title"> 
                        <a>
                            Order of Magnitude 
                        </a>
                    </h2>
                    <p>
                      Enter in two functions f(x) and g(x). If these functions have the same Order of Magnitude
                      <br></br> then the solver will provide the n, constant1, and constant2 values such that
                      <br></br> (x > n, constant1 * g(x) {'<'} f(x) {'<'} constant2 * g(x)) <br></br><br></br> Example:<br></br> f(x) = x^2 + 5 <br></br> g(x) = x^2 + x^1 + logx
                      <br></br>
                      <br></br> Please limit variable usage to only use x
                      
                    </p>
                 </div> 

                <form id = "FunctionInputForm">
                    <label>
                         f(x): {' '}
                        <input id= "FunctionF">
                          
                        </input>
                        {' '}
                    </label><br></br><br></br>
                  
                    <label>
                         g(x):
                        <input id= "FunctionG">
                          
                        </input>
                        {' '}
                    </label><br></br>
                  
                    <label><br></br>
                         <button id = "SubmitButton"   onClick = {this.HandleClick}>
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
<OrderOfMagnitude />,
 document.getElementById('root')
 );