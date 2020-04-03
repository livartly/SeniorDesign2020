import React from 'react'
import { Form, Card, Button, ListGroup, Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'

class BooleanMatrices extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            MatrixSize : "2",
            InputButtonsA:
            [{
                Val: "0"
            }],
            InputButtonsB: 
            [{
                Val: "0"
            }]
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
        
       this.CreateInputButtons()
    }

    CreateInputButtons()
    {
        var InputButtonsMatrixA = [];
           
        for(var i = 0; i < this.state.MatrixSize * this.state.MatrixSize; i++)
        {
            InputButtonsMatrixA.push({
                Val: 0
            });
        }

        this.setState(prevState => {
            return{
                InputButtonsA : InputButtonsMatrixA 
            };
        });
    }

    UpdateButtonValues(idx){
        return e => {
            var nextVal = e.currentTarget.value;
            if(nextVal == 0)
            {
                nextVal = 1
            }
            else nextVal = 0

            this.setState(prevState => {
                var newInputButton = {
                    Val : nextVal
                };
                var InputButtonsMatrixA = [];
                
                for(var i = 0; i < prevState.InputButtonsA.length; i++)
                {
                    InputButtonsMatrixA.push(prevState.InputButtonsA[i]);
                }
                InputButtonsMatrixA[idx] = newInputButton;

                return{
                    nodes: InputButtonsMatrixA
                };
            });
        };
    }

    DropDownListing()
    {
        return ["2 X 2", "3 X 3", "4 X 4", "5 X 5", "6 X 6", "7 X 7"].map(value => (
          <option val={value} key={value}> {value} </option>
        ));
    }

    createMatrixAForm()
    {
        return this.state.InputButtonsA.map((Button, idx) => {
           return(

               <div key={idx}>
                    <button
                     value={this.state.InputButtonsA[idx].Val}
                     onClick={this.UpdateButtonValues(idx)}
                     > 
                     {this.state.InputButtonsA[idx].Val}
                     
                    </button>
                </div>
           );
        });
    }
   
    HandleClick(e) 
    {
        e.preventDefault();
        var ArrayA = new Array(3);
        var ArrayB = new Array(3);

        //handle and set before here

        for(var i = 0; i < this.state.MatrixSize; i++)
        {
            ArrayA[i] = new Array(this.state.MatrixSize);
            ArrayB[i] = new Array(this.state.MatrixSize);
        }

        ArrayA[0][0] = "0"
        ArrayA[0][1] = "1"
        ArrayA[0][2] = "0"
        ArrayA[1][0] = "1"
        ArrayA[1][1] = "0"
        ArrayA[1][2] = "1"
        ArrayA[2][0] = "0"
        ArrayA[2][1] = "0"
        ArrayA[2][2] = "1"

        ArrayB[0][0] = "0"
        ArrayB[0][1] = "1"
        ArrayB[0][2] = "1"
        ArrayB[1][0] = "0"
        ArrayB[1][1] = "0"
        ArrayB[1][2] = "1"
        ArrayB[2][0] = "1"
        ArrayB[2][1] = "0"
        ArrayB[2][2] = "0"
        
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
        
        alert("ArrayA = " + Array1 + "    ArrayB = " + Array2 +  ",    ArrayC = " + ArrayC);
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
                        style={{  height: "30px", width: "120px", fontSize: "15px"}}>
                        {this.DropDownListing()}

                        </Form.Control>
                    </Form.Group>

                
                     <Form.Group>
                        <p style = {{marginLeft: "20px", marginTop: "50px"}}>
                            In the provided input boxes, please provide the data for MatrixA and MatrixB 
                        </p> <br></br>

                        <div style={{float: "left", marginLeft: "50px"}} class ="right-element">
                        <div style = {{fontSize: "25px"}}>Matrix A</div>
                            {this.createMatrixAForm()}
                        </div>

                        <div style={{float: "right", marginRight: "50px"}} class ="right-element">
                            <div style = {{fontSize: "25px"}}>Matrix B</div>

                            {this.createMatrixAForm()}
                        </div>

                     </Form.Group>
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