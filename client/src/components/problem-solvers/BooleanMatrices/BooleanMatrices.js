import React from 'react'
import { Form, Card, Button, ListGroup, Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'

class BooleanMatrices extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            MatrixSize : 2,
            InputButtonsA: [[0,0],[0,0]],
            InputButtonsB: [[0,0],[0,0]]
        };

        this.HandleClick = this.HandleClick.bind(this);
        this.updateMatrixSize = this.updateMatrixSize.bind(this);
        this.CreateInputButtons = this.CreateInputButtons.bind(this);
        this.UpdateButtonValues = this.UpdateButtonValues.bind(this);
        this.createMatrixAForm = this.createMatrixAForm.bind(this);
    }

    updateMatrixSize(event)
    {
        this.setState({
            MatrixSize: parseInt(event.currentTarget.value)
        });
    }

    CreateInputButtons()
    {
        var InputButtonsMatrixA = [];
        

        for(var i = 0; i < this.state.MatrixSize; i++)
        {  
            InputButtonsMatrixA.push([])
            for(var j = 0; j < this.state.MatrixSize; j++)
            {
                InputButtonsMatrixA[i].push(0); //defines row    row[i] = col[0,0,->n]
            }
        }

       // alert(this.state.InputButtonsA + "   " + InputButtonsMatrixA)
        this.setState(prevState => {
            return{
                InputButtonsA : InputButtonsMatrixA 
            };
        });
    }

    UpdateButtonValues(rowIndex, colIndex){
        return e => {
            var nextVal = e.currentTarget.value;
            var newInputButton;

            if(nextVal == 0)
            {
                newInputButton = 1
            }
            else newInputButton = 0

            this.setState(prevState => {

                var InputButtonsMatrixA = [];
                
                
                InputButtonsMatrixA = prevState.InputButtonsA;
                
               // alert(InputButtonsMatrixA[rowIndex][colIndex])
                InputButtonsMatrixA[rowIndex][colIndex] = newInputButton;
               // alert(InputButtonsMatrixA)
                return{
                    InputButtonsA: InputButtonsMatrixA
                };
            });
        };
    }

    DropDownListing()
    {
        return ["2 X 2", "3 X 3", "4 X 4", "5 X 5", "6 X 6"].map(value => (
          <option val={value} key={value}> {value} </option>
        ));
    }

    createMatrixAForm()
    {
        return this.state.InputButtonsA.map((dataArrayRow, rowIndex) => {
           return(
               <div >
                    <div key={rowIndex}>
                            {this.renderRow(rowIndex)}
                    </div>
                </div>
           );
        });

        
    }

    renderRow(rowIndex)
    {
        return this.state.InputButtonsA[rowIndex].map((booleanNumber, colIndex) => {
            return(
                <div style={{display:"inline-block", marginBottom: -10}} >
                   
                    <div  key={colIndex}>
                        <Button
                        variant = "white"
                        style = {{fontSize: "15px", width: 45, height: 45, borderColor: "lightgrey" , color: "black"}}
                        value={this.state.InputButtonsA[rowIndex][colIndex]}
                        onClick={this.UpdateButtonValues(rowIndex, colIndex)}
                        > 
                        {this.state.InputButtonsA[rowIndex][colIndex]}
                        </Button>
                        
                    </div>
                    
                </div>
                
            );

        });
    }
   
    HandleClick(e) 
    {
        e.preventDefault();
        var ArrayA = this.state.InputButtonsA;
        var ArrayB = this.state.InputButtonsB;

        alert(ArrayA)
        alert(ArrayB)
        //handle and set before here

        this.BooleanAnd(ArrayA, ArrayB)
        this.BooleanOr(ArrayA, ArrayB)
        this.BooleanProduct(ArrayA, ArrayB)
        this.BooleanProduct(ArrayB, ArrayA)

    }

    BooleanAnd(ArrayA, ArrayB)
    {
        alert("Entered Function And")
        var ArrayC = [];

        for(var i = 0; i < ArrayA.length; i++)
        {
            var aRow = []
            for(var j = 0; j < ArrayA.length; j++)
            {
                if(ArrayA[i][j] === 1 && ArrayB[i][j] === 1)
                {
                    aRow.push(1);
                }
                else aRow.push(0);
            }
            ArrayC.push(aRow)
        }
        alert(ArrayC)
        return ArrayC
    }

    BooleanOr(ArrayA, ArrayB)
    {
        alert("Entered Function Or")
        var ArrayC = [];

        for(var i = 0; i < ArrayA.length; i++)
        {
            var aRow = [];
            for(var j = 0; j < ArrayA.length; j++)
            {
                if(ArrayA[i][j] === 1 || ArrayB[i][j] === 1)
                {
                    aRow.push(1);
                }
                else aRow.push(0);
            }
            ArrayC.push(aRow);
        }
        alert(ArrayC);
        return ArrayC;
    }

    BooleanProduct(Array1, Array2) //Handles finding the Boolean Product of two matricies
    {
        alert("Entered Function Product");
        var ArrayC = [];

        var i, j = 0;
        var OrValue = 0;

        for(var i = 0; i < Array1.length; i++)      //2 is the m value
        {   var aRow = []
            for(j = 0; j < Array1.length; j++)
            {
                for(var k = 0; k < Array1.length; k ++)
                {
                    if(Array1[i][k] === 1 && Array2[k][j] === 1)
                    {
                        OrValue = 1
                        break;
                    }
                    else
                    {
                        OrValue = 0
                    }
                }
                if(OrValue === 1)
                {
                    aRow.push(1)
                }
                else 
                {
                    aRow.push(0)
                }
            }
            ArrayC.push(aRow)
        }
        
        alert("Array1 = " + Array1 + "    Array2 = " + Array2 +  ",    ArrayC = " + ArrayC);
        return ArrayC;
    }

    render()
    {
        return (
          <div>
          <div className="container" style= {{ marginTop: "50px"}}>
          
          <Card>
            <Card.Body>
                <Form>
                    <h1>Boolean Matrix Solver</h1>
                    <Form.Group >
                        <p style = {{marginLeft: "20px"}}>
                            Select the size of your two matrices from the dropdown below. This value will be used to determine
                            the size of Matrix A and Matrix B.
                        </p>   
                    </Form.Group>
                

                    <Form.Group style={{marginLeft: "20px"}}  controlId="booleanMatricies.DropDown" >
                    <Form.Label >Select Size</Form.Label>
                        <Form.Control
                        as="select"
                        onChange={this.updateMatrixSize}
                        onClick={this.CreateInputButtons}
                        style={{  height: "30px", width: "120px", fontSize: "15px"}}>
                        {this.DropDownListing()}

                        </Form.Control>
                    </Form.Group>

                
                     <Form.Group>
                        <p style = {{marginLeft: "20px", marginTop: "50px"}}>
                            In the provided input boxes, please provide the data for MatrixA and MatrixB 
                        </p> <br></br>



                        <div style={{display: "inline-block", marginLeft: "145px"}} class ="left-element">
                            <div style = {{fontSize: "25px"}}>Matrix A</div>
                                <Card style={{ borderColor: "black"}}>
                                    {this.createMatrixAForm()}
                                </Card>
                                
                        </div>

                        <div style={{display: "inline-block", float:"right", position:'absolute', marginLeft:"100px", marginRight: "10px"}} class ="right-element">
                            <div style = {{fontSize: "25px"}}>Matrix B</div>

                            <Card style={{ borderColor: "black"}}>
                                {this.createMatrixAForm()}
                            </Card>

                        </div>

                     </Form.Group>
                        <div> 
                                <button
                                type="button" 
                                style={{marginLeft: 412, marginRight: 410, marginTop: 15}}
                                onClick={this.HandleClick}>
                                button
                                </button>
                        </div>
                </Form>
            </Card.Body>
          </Card>

          
          </div>

          <footer style={{marginTop:"20px"}}>
          <div class="row grey">
            <div class="container main">

              <p class="copyright">
                <h6>Site Map</h6>
              </p>
              <div className="four columns">
                <Link to="/">
                <button type="button">Home</button>
                </Link>
                <Link to="/resources">
                <button type="button">Resources</button>
                </Link>
              </div>

              <div className="four columns">
                <Link to="/about">
                <button type="button">About</button>
                </Link>
                <Link to="/feedback">
                <button type="button">Contact</button>
                </Link>
              </div>

              <div className= "tweleve columns">
              <p class="copyright">
                  <h3>&copy; 2020 Wolfram Beta. All Rights Reserved.</h3>
              </p>
              </div>

            </div>

            </div>
          </footer>
          </div>
          
        )
    }
}

export default BooleanMatrices;