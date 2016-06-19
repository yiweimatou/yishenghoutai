import React from 'react'
import { Map, TileLayer} from 'react-leaflet'

const styles = {
    map:{
        height:600
    }
}
class ShowView extends React.Component{
    componentDidMount(){
        if( !this.refs._map ) return
        const api = this.refs._map.leafletElement
        const bounds = [
            api.unproject([
                0, this.props.yunbook.height
            ], this.props.yunbook.zoom), 
            api.unproject([
                this.props.yunbook.width, 0
            ], this.props.yunbook.zoom)
        ]
        api.fitBounds(bounds)
        api.setMaxBounds(bounds)
        api.setZoom(2)
    }
    render(){
        const { yunbook } = this.props
        if( !yunbook ){
            return (null)
        }
        const url = `${yunbook.path}/{z}/{x}/{y}.png`
        return (
            <Map
                 ref = '_map'                
                 style ={styles.map}
                 attributionControl = {false}
                 bounds = {[[0, this.props.yunbook.height],[this.props.yunbook.width, 0]]}
            >
                <TileLayer
                    minZoom = { 0 }
                    maxZoom = { yunbook.zoom }
                    noWrap = {true} 
                    url={ url }
                />
            </Map>
        )
    }
}

ShowView.propTypes = {
    yunbook:React.PropTypes.object
}

export default ShowView