import {StyleSheet} from 'react-native';
import Color from '../../../style/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.background,
  },
  pdf: {
    width: '100%',
    height: '80%',
  },
  approvedPDF: {
    width: '100%',
    height: '100%',
  },
  policyContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  policyContentContainer: {
    width: '85%',
    flexDirection: 'row',
  },
  policyContent: {
    color: Color.primary,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  approveBtn: {
    backgroundColor: Color.approve,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  approveDisableBtn: {
    backgroundColor: Color.disable,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  requestUpdateBtn: {
    backgroundColor: Color.requestUpdate,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  requestUpdatDisableeBtn: {
    backgroundColor: Color.disable,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 16,
    color: Color.white,
  },
  textDisableBtn: {
    fontSize: 16,
    color: Color.second,
  },
});

export {styles};
