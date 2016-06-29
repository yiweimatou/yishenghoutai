import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton,MenuItem,Tabs,Tab,Dialog,FlatButton } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'
import AreaSelect3 from '../../AreaSelect3'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import Editor from '../../Editor'

const styles = {
    contorl:{
        display:'flex'//,
        // justifyContent:''
    },
    media:{
        width:512,
        height:512
    },
    editor: {
          border: '2px solid #ccc',
          cursor: 'text',
          minHeight: 80,
          padding: 10
    },
    map:{
        height:700
    },
	form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    item:{
        width:'100%'
    },
    margin:{
        marginLeft:20
    },
    selectDiv:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%'
    },
    submit:{
        display:'flex',
        width:'100%',
        flexFlow:'row wrap',
        marginTop:30
    }
}
class EditView extends React.Component{
    constructor(props){
        super(props)
        //禁用默认右击弹出菜单
        this.state = {
            open:false,
            code:null,
            layer:null
        }
        this.onChange = editorState => this.setState({editorState})
        this.handleClose = ()=>{
            this.setState({
                open:!this.state.open
            })
        }
        this.focus = () => this.refs.editor.focus()
        this.submit = () => {
            const content = $('#summernote').summernote('code')
            if( content ){ 
                const popup  = L.popup()
                popup.setContent(content)
                this.state.layer.bindPopup(popup).openPopup()            
                const _geoJsonTemp = this.state.layer.toGeoJSON()
                _geoJsonTemp.properties._popup = content
                this._geoJson.features.push(_geoJsonTemp)
                this.props.changeLbl(escape(JSON.stringify(this._geoJson)))
                this._drawnItems.addLayer(this.state.layer)
            }
            this.setState({
                layer:null,
                code:null
            })
            this.handleClose()
        }
        document.oncontextmenu = function () {
            return false
        }
        L.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images'
        //汉化
        L.drawLocal.draw.toolbar.buttons.marker = '标注!'
        L.drawLocal.draw.handlers.marker.tooltip.start = '点击地图进行定位'
        L.drawLocal.draw.toolbar.actions.text = '取消'
        L.drawLocal.draw.toolbar.actions.title = '取消标注'
        L.drawLocal.edit.toolbar.actions.save.title = '保存修改'
        L.drawLocal.edit.toolbar.actions.save.text = '保存'
        L.drawLocal.edit.toolbar.actions.cancel.title = '取消所有修改'
        L.drawLocal.edit.toolbar.actions.cancel.text = '取消'
        L.drawLocal.edit.handlers.remove.tooltip.text = '点击标注删除'
        L.drawLocal.edit.handlers.edit.tooltip.text = '拖拽标注重新定位'
        L.drawLocal.edit.handlers.edit.tooltip.subtext = '点击取消撤销操作'
        L.drawLocal.edit.toolbar.buttons.edit = '修改'
        L.drawLocal.edit.toolbar.buttons.remove = '删除标注'
        L.drawLocal.edit.toolbar.buttons.editDisabled = '没有标注需要修改'
        L.drawLocal.edit.toolbar.buttons.removeDisabled = '没有标注需要删除'
    }
    
    componentWillReceiveProps(nextProps){
        if(this._map&&nextProps.yunbook) return
        const { yunbook } = nextProps
        const url = `${yunbook.path}/{z}/{x}/{y}.png`
        const self = this
        this._map =  L.map('_map',{
            maxZoom:yunbook.zoom,
            minZoom:0,
            attributionControl: false
        })
        const bounds =new L.LatLngBounds(this._map.unproject([
            0, yunbook.height
        ], yunbook.zoom), this._map.unproject([
            yunbook.width, 0
        ], yunbook.zoom))    
        this._map.setMaxBounds(bounds)
        this._map.fitBounds(bounds)
        L.tileLayer(url,{
            minZoom:0,
            maxZoom:yunbook.zom,
            bounds:bounds,
            noWrap:true
        }).addTo(this._map)

        this._drawnItems = new L.FeatureGroup().addTo(this._map)
         this._geoJson = {
            type: 'FeatureCollection',
            features: []
        }
        if( yunbook.lbl ){
            this._drawnItems = L.geoJson(JSON.parse(unescape(yunbook.lbl)), {
                onEachFeature: function (featureData, layer) {
                    if (featureData.geometry.type === 'Point') {
                        var popup = L.popup()
                        popup.setContent(featureData.properties._popup)
                        layer.bindPopup(popup)
                    }
                }
            }).addTo(this._map)
            for (var id in this._drawnItems._layers) {
                var _json = this._drawnItems._layers[id].toGeoJSON()
                _json.properties._id = this._drawnItems._layers[id]._leaflet_id
                this._geoJson.features.push(_json)
            }
        }
        new L.Control.Draw({
            edit: {
                featureGroup: this._drawnItems,
                edit: {
                    selectedPathOptions: {
                        maintainColor: true,
                        opacity: 0.3
                    }
                }
            },
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false
            }
        }).addTo(this._map)
        // function removeLayer(id) {
        //     self._drawnItems.removeLayer(id)
        //     removeGeoJson(id)
        // }
        function updateGeoJson(geoJson) {
            self._geoJson = self._geoJson.features.map(item=>{
                if(item.properties._id === geoJson.properties._id){
                    return geoJson
                }
                return item
            })
            self.props.changeLbl(escape(JSON.stringify(self._geoJson)))
        }
        function findGeoJson(id) {
            return self._geoJson.features.find( item=>item.properties._id === id)
        }

        function removeGeoJson(id) {
            self._geoJson.features = self._geoJson.features.filter( item=>item.properties._id !== id)
            self.props.changeLbl(escape(JSON.stringify(self._geoJson)))
        }
        this._map.on('draw:created',e=>{
            const layer = e.layer
            const type = e.layerType
            if( type === 'marker' ){
                self.handleClose()
                self.setState({
                    layer:layer
                })
            }
        })
        this._map.on('draw:edited', function (e) {
            e.layers.eachLayer(function (_layer) {
                const tmp = findGeoJson(_layer._leaflet_id)
                if (tmp != undefined) {
                    const latLng = _layer.getLatLng()
                    tmp.geometry.coordinates = [latLng.lng, latLng.lat]
                    updateGeoJson(tmp)
                }
            })
        })
        this._map.on('draw:deleted', function (e) {
            e.layers.eachLayer(function (_layer) {
                removeGeoJson(_layer._leaflet_id)
            })
        })
        this._map.on('mousedown', function drawPoly(e) {
            e.originalEvent.preventDefault()
            // this._map.dragging.disable(); 如果不是右击则退出
            if (2 != e.originalEvent.button) {
                return false
            }
            var polyLine = new L.Polyline([])
            self._drawnItems.addLayer(polyLine)
            self._map.on('mousemove', function (e) {
                polyLine.addLatLng(e.latlng)
            })
            self._map.on('mouseup', function () {
                self._map.off('mousemove')
                self._map.off('mouseup')
                const polyLineTmp = polyLine.toGeoJSON()
                polyLineTmp.properties._id = polyLine._leaflet_id
                self._geoJson.features.push(polyLineTmp)
                self.props.changeLbl(escape(JSON.stringify(self._geoJson)))
                // polyLine.bindPopup('<div><i class="fa fa-trash" onClick="removeLayer(' + polyLine._leaflet_id + ')"</div></i>')
            })
        })
    } 
    onClick(){
        document.querySelector('#_submit').click()
    }
    render(){
        const {
            submitting, 
            invalid, 
            handleSubmit,
            areaSelectProps,
            handleChange
        } = this.props
        const actions = [
            <FlatButton
                label="取消"
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="保存"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.submit}
            />
        ]
        return (
            <div>
                <Dialog
                    actions = { actions }
                    title = '输入标注内容'
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >   
                    <Editor />
                </Dialog>
                <Tabs>
                    <Tab label="云板书基础信息编辑">
                        <form style = { styles.form } onSubmit={handleSubmit} >
                            <Field
                                name = 'title'
                                type = 'text'
                                hintText = '云板书名称'
                                floatingLabelText = '云板书名称'
                                component = {TextField}
                                style = { styles.item }
                                />
                            <Field
                                name = 'status'
                                type = 'text'
                                hintText = '云板书状态'
                                floatingLabelText = '云板书状态'
                                component = {SelectField}
                                style = { styles.item }
                                >
                                <MenuItem
                                    primaryText = '仅自己可见'
                                    value = { 1 }
                                    />
                                <MenuItem primaryText = '所有人可见' value={2}/>
                            </Field>
                            <AreaSelect3
                                {...areaSelectProps}
                                handleChange={ handleChange }
                            />
                            <Field name = 'descript'
                                hintText = '云板书简介'
                                floatingLabelText = '云板书简介'
                                component = { TextField }
                                multiLine = { true }
                                rows = { 2 }
                                style = { styles.item }
                            />
                            <button type='submit' id = '_submit' hidden/>
                        </form>
                    </Tab>
                    <Tab label="标注编辑">
                        <div id='_map' style={styles.map}>
                        </div>
                    </Tab>
                </Tabs>
                <div style = { styles.submit } >
                    <RaisedButton
                        label = '保存编辑'
                        primary = { true }
                        disabled = { submitting || invalid }
                        onClick = { this.onClick }
                    />
                </div> 
            </div>
        )
    }
}

EditView.propTypes ={
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    invalid:React.PropTypes.bool.isRequired,
    areaSelectProps:React.PropTypes.object,
    handleChange:React.PropTypes.func.isRequired,
    yunbook:React.PropTypes.object,
    changeLbl:React.PropTypes.func.isRequired
}

export default EditView
