import React from 'react'

interface ToReadProps {
    // FetchList: () => void, 
    // BookListMapper: () => void, 
}
 
interface ToReadState {
    
}
 
class ToRead extends React.Component<ToReadProps, ToReadState> {
    // constructor(props: ToReadProps) {
    //     super(props);
    //     this.state = { :  };
    // }
    render() { 
        return ( 
            <div>
                Hello from To Read 
            </div>
         );
    }
}
 
export default ToRead;