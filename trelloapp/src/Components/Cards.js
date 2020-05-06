import React from 'react';
import '../App.css'
import Card from '@material-ui/core/Card'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent'
import { Draggable } from 'react-beautiful-dnd'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { bindActionCreators } from 'redux';
import { handleDeleteCard, handleEditCard, editCardInput, handleSubmit } from '../actionCreators/actions'




class Cards extends React.Component {
  render() {
    
    const { cardId, listId, index, text } = this.props
    
    return (
      <Draggable draggableId={String(this.props.cardId)} index={this.props.index}>
        {provided => (
          <div
          ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className="card">


              <CardContent >
                {
                  this.props.lists.isEditListCard === this.props.lists.list.find(el => el._id === listId)._id
                    && this.props.lists.list.find(el => el._id === listId).cards.find(cr => cr._id === cardId)._id === this.props.lists.isEditCard
                    ? <SaveIcon className="icon" fontSize="small"
                      onMouseDown={() => this.props.handleSubmit(listId, index, this.props.lists.editData.text,cardId)} />
                    : <EditIcon className="icon"
                      onClick={() => this.props.handleEditCard(cardId, listId, index)}
                      fontSize="small"
                    >edit
                </EditIcon>

                 
                }

                <DeleteIcon className="icon"
                  onClick={() => { this.props.handleDeleteCard(listId, cardId, index) }}
                  fontSize="small"
                >delete
            </DeleteIcon>
                <Typography gutterBottom>

                  {this.props.lists.isEditListCard === this.props.lists.list.find(el => el._id === listId)._id
                    && this.props.lists.list.find(el => el._id === listId).cards.find(cr => cr._id === cardId)._id === this.props.lists.isEditCard

                      ? <input type="text" className="form-control" value={this.props.lists.editData.text} placeholder="Please enter card name"
                      onChange={(e) => { this.props.editCardInput(e.target.value) }}
                    />
                      : text

                  }
                </Typography>
              </CardContent>
            </Card>
          </div>
        )

        }

      </Draggable>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDisaptchToProps = (dispatch) => {
  return bindActionCreators({ handleDeleteCard, handleEditCard, editCardInput, handleSubmit }, dispatch)
}
export default connect(mapStateToProps, mapDisaptchToProps)(Cards)