import { connect } from "react-redux";
import _ from 'lodash';
import { DateDataContainer, DateContainer } from '../styledComponent/index'

function DateComponent(props) {
    
 
    return (
      <DateDataContainer>
        <DateContainer>
          { props.date }
        </DateContainer>
      
      </DateDataContainer>
      
    );
  }

  const mapStateToProps = (state, ownProps) => {
      var date = ownProps.date + '-' + ownProps.month + '-' + ownProps.year
      var userData = state.appointment.filter( ( data ) => data.date ===  date)
      return {
        userData: userData
      }
  }

  
export default connect(mapStateToProps)(DateComponent);
  