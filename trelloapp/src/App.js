import React, { Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import TrelloList from './Components/TrelloList'
import AddActionButton from './Components/AddActionButton'
import Header from './Components/Header'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort, getLists } from './actionCreators/actions'
import { bindActionCreators } from 'redux';


class App  extends React.Component {

  componentDidMount = () => {
    this.props.getLists();
    
}

// componentDidUpdate=()=>{
//   this.props.getLists();
// }
  onDragEnd = (result) => {
    const { destination, source, draggableId, type, listId } = result
  //  const index = this.props.lists.list.length
    if (!destination) {
      return
    }
    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type,
      listId
    )

  }
  render() {
    return (
      <Fragment>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* <div> */}
            <Droppable
              droppableId="all_lists"
              direction="horizontal"
              type="list"
            >
              {(provided) => (
                <div
                  className="App-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.props.lists.map((list, index) => (
                    <TrelloList
                      key={list._id}
                      listId={list._id}
                      index={index}
                      title={list.title}
                      cards={list.cards}
                    />
                  ))}
                  {provided.placeholder}

                  <AddActionButton list />
                </div>
              )}
            </Droppable>
          {/* </div> */}
        </DragDropContext>
      </Fragment>
    );
  }

}


const mapStateToProps = state => {
  return {
    lists: state.lists.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sort, getLists }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
