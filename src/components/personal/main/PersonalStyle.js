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
    height: 120,
    alignItems: 'center',
  },
  avtContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Color.primary,
  },
  avtIcon: {
    fontSize: 50,
    color: Color.primary,
  },
  profileName: {
    fontSize: 24,
    color: Color.primary,
    marginTop: 8,
  },
  settingContainer: {
    marginTop: 50,
    backgroundColor: Color.fourth,
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
    marginTop: 60,
    width: 202,
    height: 45,
    backgroundColor: Color.btn,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
});
export {styles};
