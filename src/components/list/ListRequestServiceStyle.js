import {StyleSheet} from 'react-native';
import Color from '../../styles/Color';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background1,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    color: Color.primary,
    fontWeight: '500',
  },
  filter: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterBtn: {
    width: 60,
    height: 24,
    backgroundColor: Color.third,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: Color.primary,
  },
  //Request Service Item
  requestServiceItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Color.third,
    borderRadius: 10,
    height: 65,
    marginBottom: 8,
  },
  requestServiceItemImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  requestServiceItemName: {
    width: '60%',
    fontSize: 18,
    color: Color.primary,
  },
  requestServiceItemStatus: {
    width: 77,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.fifth,
  },
  requestServiceItemStatusText: {
    color: Color.primary,
  },
});
export {styles};
