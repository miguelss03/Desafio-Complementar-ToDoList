import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash.png';

interface TasksItemProps {
    tasks: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}


export function TaskItem({ tasks, editTask, removeTask, toggleTaskDone }: TasksItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(tasks);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(tasks.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask({ taskId: tasks.id, taskNewTitle: taskNewTitleValue });
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);


    return (
        <View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(tasks.id)}
                >
                    <View
                        style={
                            tasks.done ? styles.taskMarkerDone : styles.taskMarker
                        }
                    >
                        {tasks.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={tasks.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Text style={{ color: '#808080' }}>Editar</Text>
                    </TouchableOpacity>
                )}
            </View>
            
            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(tasks.id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})