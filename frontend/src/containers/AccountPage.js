import React from 'react'
import { connect } from 'react-redux'
import { AccountPage } from 'components'
import { Redirect } from 'react-router-dom'


class AccountPageContainer extends React.Component {
  
  /*
  componentDidMount(){
    const { roomname, toname, member, money, account, onAccoutPage } = this.props
    onAccoutPage(toname,member)
  }
  */
  render(){
    
    /*
  
    if( !props.roomname ){
      return(
          <Redirect to="/" />
      )
    }
    else if( !props.toname ){
      return(
        <Redirect to={`/room/${props.roomname}`}/>
      )
    } 
    else {
      return (
        <AccountPage {...props} />
      )
    }
    */
    return (
        <AccountPage {...this.props} />
    )

  }

}

const mapStateToProps = (state) => ({
    
    roomname : state.room.room.roomname,
    sendlist: state.payment.sendlist,
    members : state.member.members

    //toname : state.payment.senddata.to,
    //member: state.member.members,
    
    //money : state.payment.senddata.label,
    //account : state.payment.account,

})

const mapDispatchToProps = dispatch => ({
  //onAccoutPage: (toname,member) => dispatch(accountinRequest(toname,member)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AccountPageContainer)