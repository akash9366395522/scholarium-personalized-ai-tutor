import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { imageAssets } from './../constant/Option';

export const ShareProgress = ({item, width=280}) => {
    const GetCompletedChapters = (course) => {
        const completedChapter=course?.completedChapter?.length;
        const perc=completedChapter/course?.chapters?.length;
        return perc;
      };
  return (
    <View style={{
        margin: 7,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: width,


    }}>
          <View style={styles.contentRow}>
            <Image source={imageAssets[item?.banner_image]} style={styles.bimage} />
            <View style={styles.textContent}>
              <Text numberOfLines={2} style={styles.courseTitle}>
                {item?.courseTitle}
              </Text>
              <Text style={styles.chapterText}>
                {item?.chapters?.length} Chapter
              </Text>
            </View>
          </View>
          <View style={styles.bar}>
            <Progress.Bar progress={GetCompletedChapters(item)} width={width-30} color="#00103D" />
            <Text style={styles.bartext}>
              {item?.completedChapter?.length ?? 0} out of {item?.chapters?.length} Chapters Completed
            </Text>
          </View>
        </View>
  )
}



const styles = StyleSheet.create({

    heading: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#00103D',
        marginHorizontal: 10,
        marginBottom: 5,
        paddingLeft: 10,
      },
    
     
    
      contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      bimage: {
        width: 80,
        height: 80,
        borderRadius: 10,
      },
    
      textContent: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
      },
    
      courseTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        flexWrap: 'wrap',
      },
    
      chapterText: {
        fontSize: 14,
        marginTop: 4,
        color: 'grey',
        fontWeight: 'bold',
      },
      bar:{
    
        marginTop: 10,
    
      },
      bartext: {
        fontSize: 12,
        
        marginTop: 2,
      },


})