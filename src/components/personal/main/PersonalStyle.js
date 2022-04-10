import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.background1,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
  },
  avtIcon: {
    width: 90,
    height: 90,
  },
  profileName: {
    fontSize: 24,
    color: Color.primary,
    marginTop: 10,
  },
  settingContainer: {
    marginTop: 50,
    backgroundColor: Color.field,
    borderRadius: 10,
    width: '100%',
  },
  settingItemBorderContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  settingItemContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  settingItemIcon: {
    fontSize: 18,
    color: Color.primary,
    marginRight: 16,
  },
  settingItemName: {
    fontSize: 18,
    color: Color.primary,
  },
  settingItemBack: {
    fontSize: 18,
    color: Color.primary,
    position: 'absolute',
    right: 16,
  },
  signOutBtn: {
    marginTop: 50,
    paddingVertical: 12,
    paddingHorizontal: 60,
    backgroundColor: Color.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
  },
});
export {styles};
