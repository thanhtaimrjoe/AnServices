import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    paddingHorizontal: 16,
    flex: 1,
  },
  //service
  serviceContainer: {
    marginVertical: 16,
  },
  serviceTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 8,
  },
  //service item
  serviceItemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.fourth,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
  },
  serviceItemTextContainer: {
    width: '60%',
  },
  serviceItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
  serviceItemDescription: {
    fontSize: 14,
    color: Color.primary,
  },
  serviceItemImg: {
    width: 90,
    height: 90,
  },
  //description
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  descriptionView: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Color.field,
  },
  descriptionText: {
    color: Color.sixth,
  },
  //date
  dateContainer: {
    marginBottom: 16,
  },
  dateTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  dateView: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Color.field,
  },
  dateText: {
    color: Color.sixth,
  },
  //media
  mediaContainer: {
    marginBottom: 16,
  },
  mediaTitle: {
    fontSize: 18,
    color: Color.primary,
    marginBottom: 10,
  },
  mediaFileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mediaView: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  mediaBtnIcon: {
    fontSize: 25,
    color: Color.primary,
  },
  //media view dialog
  mediaFull: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  //dialog
  dialogBackground: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  //play button
  playImg: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 33,
    right: 35,
  },
});
export {styles};
