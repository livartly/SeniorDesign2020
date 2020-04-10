import React from 'react'
import { Form, Card, Button } from 'react-bootstrap';
import { sendProblem } from '../../../utils/problemsAPIUtil';

class BooleanMatrices extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            MatrixSize : 2,
            InputButtonsA: [[0,0],[0,0]],
            InputButtonsB: [[0,0],[0,0]],
            AnswerAnd: undefined,
            AnswerOr: undefined,
            AnswerProduct: undefined,
            AnswerReverseProduct: undefined,
            AnswerRegProduct: undefined,
            AnswerRegReverseProduct: undefined
        };

        this.HandleClick = this.HandleClick.bind(this);
        this.updateMatrixSize = this.updateMatrixSize.bind(this);
        this.CreateInputButtons = this.CreateInputButtons.bind(this);
        this.UpdateButtonValues = this.UpdateButtonValues.bind(this);
        this.createMatrixForm = this.createMatrixForm.bind(this);
        this.displayAnswer = this.displayAnswer.bind(this);
    }

    updateMatrixSize(event)
    {
        this.setState({
            MatrixSize: parseInt(event.currentTarget.value)
        }, () => {this.CreateInputButtons()} );
    }

    CreateInputButtons()
    {
        var InputButtonsMatrixA = [];
        var InputButtonsMatrixB = [];
        
        for(var i = 0; i < this.state.MatrixSize; i++)
        {  
            InputButtonsMatrixA.push([])
            InputButtonsMatrixB.push([])
            for(var j = 0; j < this.state.MatrixSize; j++)
            {
                InputButtonsMatrixA[i].push(0); //defines row    row[i] = col[0,0,->n]
                InputButtonsMatrixB[i].push(0);
            }
        }

        this.setState(prevState => {
            return{
                InputButtonsA : InputButtonsMatrixA,
                InputButtonsB : InputButtonsMatrixB
            };
        });
    }

    UpdateButtonValues(rowIndex, colIndex, MatrixFlag){
        return e => {
            var nextVal = e.currentTarget.value;
            var newInputButton;

            if(nextVal == 0)
            {
                newInputButton = 1
            }
            else newInputButton = 0

            if(MatrixFlag === 0)
            {
                this.setState(prevState => {

                    var InputButtonsMatrixA = [];
                    
                    InputButtonsMatrixA = Array.from(prevState.InputButtonsA);
                    InputButtonsMatrixA[rowIndex][colIndex] = newInputButton;
                    return{
                        InputButtonsA: InputButtonsMatrixA
                    };
                });
            }
            else if(MatrixFlag === 1)
            {
                this.setState(prevState => {

                    var InputButtonsMatrixB = [];
                    
                    InputButtonsMatrixB = Array.from(prevState.InputButtonsB);
                    
                    InputButtonsMatrixB[rowIndex][colIndex] = newInputButton;
                    return{
                        InputButtonsB: InputButtonsMatrixB
                    };
                });
            }
        };
    }

    DropDownListing()
    {
        return ["2 X 2", "3 X 3", "4 X 4", "5 X 5", "6 X 6"].map(value => (
          <option val={value} key={value}> {value} </option>
        ));
    }

    createMatrixForm(MatrixFlag)
    {
        if(MatrixFlag == 0)
        {
            return this.state.InputButtonsA.map((dataArrayRow, rowIndex) => {
            return(
                <div key={rowIndex}>
                    <div >
                        {this.renderRow(rowIndex, MatrixFlag)}
                    </div>
                </div>
            );
            }); 
        }
        else if(MatrixFlag == 1)
        {
            return this.state.InputButtonsB.map((dataArrayRow, rowIndex) => {
                return(
                    <div key={rowIndex}>
                        <div >
                            {this.renderRow(rowIndex, MatrixFlag)}
                        </div>
                    </div>
                );
                }); 
        }
    }

    renderRow(rowIndex, MatrixFlag)
    {
        if(MatrixFlag == 0)
        {
            return this.state.InputButtonsA[rowIndex].map((booleanNumber, colIndex) => {
                return(
                    <div key={colIndex} style={{display:"inline-block", marginBottom: -10}} >
                    
                        <div  >
                            <Button
                            variant = "white"
                            style = {{fontSize: "15px", width: 45, height: 45, borderColor: "lightgrey" , color: "black"}}
                            value={this.state.InputButtonsA[rowIndex][colIndex]}
                            onClick={this.UpdateButtonValues(rowIndex, colIndex, MatrixFlag)}
                            > 
                            {this.state.InputButtonsA[rowIndex][colIndex]}
                            </Button>
                        </div>
                    </div>
                );
            });
        }
        else if(MatrixFlag == 1)
        {
            return this.state.InputButtonsB[rowIndex].map((booleanNumber, colIndex) => {
                return(
                    <div key={colIndex} style={{display:"inline-block", marginBottom: -10}} >
                    
                        <div  >
                            <Button
                            variant = "white"
                            style = {{fontSize: "15px", width: 45, height: 45, borderColor: "lightgrey" , color: "black"}}
                            value={this.state.InputButtonsB[rowIndex][colIndex]}
                            onClick={this.UpdateButtonValues(rowIndex, colIndex, MatrixFlag)}
                            > 
                            {this.state.InputButtonsB[rowIndex][colIndex]}
                            </Button>
                        </div>
                    </div>
                );
            });
        }
    }
   
    HandleClick(e) 
    {
        e.preventDefault();
        var ArrayA = this.state.InputButtonsA;
        var ArrayB = this.state.InputButtonsB;


        //Send Problem         
        sendProblem({
            userID: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email,
            typeIndex: 11,
            input: {
              InputButtonsA:this.state.InputButtonsA.toString(),
              InputButtonsB:this.state.InputButtonsB.toString()
            }
        });

        this.setState(prevState => {

            return{
                AnswerAnd: this.BooleanAnd(ArrayA, ArrayB),
                AnswerOr: this.BooleanOr(ArrayA, ArrayB),
                AnswerProduct: this.BooleanProduct(ArrayA, ArrayB),
                AnswerReverseProduct: this.BooleanProduct(ArrayB, ArrayA),
                AnswerRegProduct: this.dotProduct(ArrayA, ArrayB),
                AnswerRegReverseProduct: this.dotProduct(ArrayB, ArrayA)
            };
        });

    }

    BooleanAnd(ArrayA, ArrayB)
    {
        //alert("Entered Function And")
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
        //alert(ArrayC)
        return ArrayC
    }

    BooleanOr(ArrayA, ArrayB)
    {
        //alert("Entered Function Or")
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
        //alert(ArrayC);
        return ArrayC;
    }

    BooleanProduct(Array1, Array2) //Handles finding the Boolean Product of two matricies
    {
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
        
        //alert("Array1 = " + Array1 + "    Array2 = " + Array2 +  ",    ArrayC = " + ArrayC);
        return ArrayC;
    }

    dotProduct(Array1, Array2) //Will be used to verify if (A X B === A dot B)
    {
        var ArrayC = [];

        var i, j = 0;
        var OrValue = 0;

        for(var i = 0; i < Array1.length; i++)      //2 is the m value
        {   var aRow = []
            for(j = 0; j < Array1.length; j++)
            { var sum = 0;
                for(var k = 0; k < Array1.length; k ++)
                {
                    sum = sum + Array1[i][k] * Array2[k][j]
                }
                aRow.push(sum);
            }
            ArrayC.push(aRow);
        }
        
        //alert("Array1 = " + Array1 + "    Array2 = " + Array2 +  ",    ArrayC = " + ArrayC);
        return ArrayC;
    }

    displayAnswer()
    {
        if(this.state.AnswerAnd != undefined && this.state.AnswerOr != undefined && this.state.AnswerProduct != undefined && this.state.AnswerReverseProduct != undefined)
        {
            return(
                <div style={{marginLeft: 30, width: "100%"}}>
                    
                    <div style={{float: "left", marginRight: "50px", marginTop: "5px", marginBottom: "5px"}}>
                   <b>A &and; B </b> 
                        <Card style={{borderColor:"gray"}}> 
                            {this.state.AnswerAnd.map((row, i) =>
                            <div style={{padding: "0px",marginBottom: -5}} key={i}>
                                {this.state.AnswerAnd[i].map((col, j) => 
                                    <div style={{display:"inline-block", marginLeft: 5, marginRight: 5, padding: "5px"}}>
                                        {this.state.AnswerAnd[i][j]}
                                    </div>
                                )}
                            </div>
                            )}
                        </Card>
                    </div>
                    <div style={{float: "left", marginRight: "50px", marginTop: "5px", marginBottom: "5px"}}>
                  <b> A &or; B </b> 
                        <Card style={{borderColor:"gray"}}> 
                            {this.state.AnswerOr.map((row, i) =>
                                <div style={{padding: "0px",marginBottom: -5}} key={i}>
                                    {this.state.AnswerOr[i].map((col, j) => 
                                        <div style={{display:"inline-block", marginLeft: 5, marginRight: 5, padding: "5px"}}>
                                            {this.state.AnswerOr[i][j]}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                    
                    <div style={{float: "left", marginRight: "50px", marginTop: "5px", marginBottom: "5px"}}>

                   <b> A X B </b> 
                        <Card style={{borderColor:"gray"}}> 
                            {this.state.AnswerProduct.map((row, i) =>
                                <div style={{padding: "0px",marginBottom: -5}} key={i}>
                                    {this.state.AnswerProduct[i].map((col, j) => 
                                        <div style={{display:"inline-block", marginLeft: 5, marginRight: 5, padding: "5px"}}>
                                            {this.state.AnswerProduct[i][j]}
                                          </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                    <div style={{float: "left", marginRight: "50px", marginTop: "5px", marginBottom: "5px"}}>
                    <b> B X A </b>
                        <Card style={{borderColor:"gray"}}> 
                              {this.state.AnswerReverseProduct.map((row, i) =>
                                <div style={{padding: "0px",marginBottom: -5}} key={i}>
                                    {this.state.AnswerReverseProduct[i].map((col, j) => 
                                        <div style={{display:"inline-block", marginLeft: 5, marginRight: 5, padding: "5px"}}>
                                            {this.state.AnswerReverseProduct[i][j]}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                   
                    <div style={{float:"left", marginRight: "50px", marginTop: "5px", marginBottom: "5px"}}>
                    <b> A · B </b>
                        <Card style={{borderColor:"gray"}}> 
                              {this.state.AnswerRegProduct.map((row, i) =>
                                <div style={{padding: "0px",marginBottom: -5}} key={i}>
                                    {this.state.AnswerRegProduct[i].map((col, j) => 
                                        <div style={{display:"inline-block", marginLeft: 5, marginRight: 5, padding: "5px"}}>
                                            {this.state.AnswerRegProduct[i][j]}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>

                    <div style={{float:"left", marginRight: "50px", marginTop: "5px", marginBottom: "5px"}}>
                    <b> B · A </b>
                        <Card style={{borderColor:"gray"}}> 
                              {this.state.AnswerRegReverseProduct.map((row, i) =>
                                <div style={{padding: "0px",marginBottom: -5}} key={i}>
                                    {this.state.AnswerRegReverseProduct[i].map((col, j) => 
                                        <div style={{display:"inline-block", marginLeft: 5, marginRight: 5, padding: "5px"}}>
                                            {this.state.AnswerRegReverseProduct[i][j]}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    </div>
                    
                </div>
                
            )
        }
        return (
            <div>
                
            </div>
        )
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
                            <b>Instructions</b> <br></br>Select the size of your two matrices from the dropdown below. This value will be used to determine
                            the size of Matrix A and Matrix B. In the provided input boxes, please then provide the data for Matrix A and Matrix B. These Matrices follow the standard format for a Matrix.
                            Rows are along the vertical axis and Columns are along the horizontal. Once you have entered all available values for Matrix A and
                            Matrix B, click the submit button to get your answers in the result area below.
                        </p>   
                        <p style = {{marginLeft: "20px", marginTop: "25px"}}>
                            
                        </p> <br></br>
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
                        

                        <div style={{display: "inline-block", marginLeft: "145px"}} class ="left-element">
                            <div style = {{fontSize: "25px"}}>Matrix A</div>
                                <Card style={{ borderColor: "black"}}>
                                    {this.createMatrixForm(0)}
                                </Card>
                        </div>

                        <div style={{display: "inline-block", float:"right", position:'absolute', marginLeft:"100px", marginRight: "10px"}} class ="right-element">
                            <div style = {{fontSize: "25px"}}>Matrix B</div>

                            <Card style={{ borderColor: "black"}}>
                                {this.createMatrixForm(1)}
                            </Card>
                        </div>

                     </Form.Group>
                        <div> 
                                <button
                                type="button" 
                                style={{marginLeft: 412, marginRight: 410, marginTop: 15}}
                                onClick={this.HandleClick}>
                                Submit
                                
                                </button>
                        </div>

                    <Form.Group controlId="truthTableBuilder.cardOutput">
                    <Form.Label>Result</Form.Label>
                    <Card body style={{ minHeight: "100px" }}>
                        {this.displayAnswer()}
                    </Card>
                </Form.Group>

                </Form>
            </Card.Body>
          </Card>

          </div>
          <br></br>
          <br></br>
          </div>
          
        )
    }
}

export default BooleanMatrices;