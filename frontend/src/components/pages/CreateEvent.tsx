import { useState } from "react";
import Footer from "../base/Footer";
import Header from "../base/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomCheckbox from "../base/CustomCheckbox";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCreateEventMutation } from "../../store/apis/EventAPI";
import { IRegistrationEvent } from "../../models/IEvent";
import { formatDateToISO } from "../../functions/formatDateToISO";
import { useNavigate } from "react-router-dom";
import FileUpload from "../base/FileUpload";
import { uploadImage } from "./uploadImage";

interface IEventForm extends IRegistrationEvent {}

function CreateEvent() {

    const navigate = useNavigate()
    const [createEvent, createEventResult] = useCreateEventMutation()

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const [image, setImage] = useState<File>()

    const {register, handleSubmit, control} = useForm<IEventForm>()

    const submit:SubmitHandler<IEventForm> = async (data) => {
        console.log(data);
        console.log(control._fields);
        
        const result = await createEvent({...data, 
            datetime_start:startDate? formatDateToISO(startDate) : Date.now().toString(),
            datetime_end:endDate? formatDateToISO(endDate) : Date.now().toString(),
        })

        if (result) return navigate('/')
    }
    
    return (  
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[1320px] mx-auto mt-[20px] flex-grow">
                <h1 className="text-[24px] mt-[28px]">Создать мероприятие</h1>
                <div className="flex justify-between gap-[80px] mt-[60px]">
                    <div className="">
                        <svg width="602" height="629" viewBox="0 0 602 629" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="602" height="629" rx="7" fill="#D0DADF"/>
                            <path d="M154.923 281.719V296.264H153.162V283.281H145.832V296.264H144.071V281.719H154.923ZM158.249 300.355V285.355H159.868V287.088H160.067C160.19 286.899 160.361 286.657 160.578 286.364C160.801 286.065 161.118 285.8 161.53 285.568C161.947 285.331 162.51 285.213 163.221 285.213C164.139 285.213 164.949 285.443 165.65 285.902C166.35 286.361 166.897 287.012 167.29 287.855C167.683 288.698 167.88 289.692 167.88 290.838C167.88 291.993 167.683 292.995 167.29 293.842C166.897 294.685 166.353 295.338 165.657 295.802C164.961 296.262 164.158 296.491 163.249 296.491C162.548 296.491 161.987 296.375 161.566 296.143C161.144 295.907 160.82 295.639 160.593 295.341C160.365 295.038 160.19 294.787 160.067 294.588H159.925V300.355H158.249ZM159.897 290.81C159.897 291.633 160.017 292.36 160.259 292.99C160.5 293.615 160.853 294.105 161.317 294.46C161.781 294.811 162.349 294.986 163.022 294.986C163.722 294.986 164.307 294.801 164.776 294.432C165.249 294.058 165.605 293.556 165.841 292.926C166.083 292.292 166.203 291.586 166.203 290.81C166.203 290.043 166.085 289.351 165.848 288.736C165.616 288.115 165.264 287.625 164.79 287.266C164.321 286.901 163.732 286.719 163.022 286.719C162.34 286.719 161.767 286.891 161.303 287.237C160.839 287.578 160.489 288.056 160.252 288.672C160.015 289.283 159.897 289.995 159.897 290.81ZM175.01 296.491C173.959 296.491 173.052 296.259 172.29 295.795C171.533 295.327 170.948 294.673 170.536 293.835C170.129 292.992 169.925 292.012 169.925 290.895C169.925 289.777 170.129 288.793 170.536 287.94C170.948 287.083 171.521 286.416 172.255 285.937C172.993 285.454 173.855 285.213 174.84 285.213C175.408 285.213 175.969 285.308 176.523 285.497C177.077 285.686 177.581 285.994 178.036 286.42C178.49 286.842 178.853 287.4 179.123 288.097C179.392 288.793 179.527 289.65 179.527 290.668V291.378H171.118V289.929H177.823C177.823 289.313 177.7 288.764 177.453 288.281C177.212 287.798 176.866 287.417 176.417 287.138C175.971 286.858 175.446 286.719 174.84 286.719C174.172 286.719 173.595 286.884 173.107 287.216C172.624 287.543 172.252 287.969 171.992 288.494C171.731 289.02 171.601 289.583 171.601 290.185V291.15C171.601 291.974 171.743 292.673 172.027 293.246C172.316 293.814 172.716 294.247 173.228 294.545C173.739 294.839 174.333 294.986 175.01 294.986C175.451 294.986 175.848 294.924 176.203 294.801C176.563 294.673 176.873 294.484 177.134 294.233C177.394 293.977 177.596 293.66 177.738 293.281L179.357 293.736C179.186 294.285 178.9 294.768 178.498 295.185C178.095 295.597 177.598 295.918 177.006 296.15C176.414 296.378 175.749 296.491 175.01 296.491ZM180.912 299.389V294.702H181.821C182.044 294.47 182.236 294.219 182.397 293.949C182.558 293.679 182.697 293.359 182.816 292.99C182.939 292.616 183.043 292.161 183.128 291.626C183.213 291.087 183.289 290.436 183.355 289.673L183.725 285.355H190.657V294.702H192.333V299.389H190.657V296.264H182.588V299.389H180.912ZM183.725 294.702H188.98V286.918H185.287L185.003 289.673C184.885 290.814 184.738 291.811 184.563 292.663C184.388 293.516 184.108 294.195 183.725 294.702ZM194.558 296.264V285.355H199.018C200.192 285.355 201.125 285.62 201.816 286.15C202.507 286.681 202.853 287.382 202.853 288.253C202.853 288.916 202.656 289.429 202.263 289.794C201.871 290.154 201.366 290.398 200.751 290.525C201.153 290.582 201.544 290.724 201.923 290.952C202.306 291.179 202.623 291.491 202.874 291.889C203.125 292.282 203.251 292.765 203.251 293.338C203.251 293.897 203.109 294.396 202.825 294.837C202.54 295.277 202.133 295.625 201.603 295.881C201.073 296.136 200.438 296.264 199.7 296.264H194.558ZM196.148 294.73H199.7C200.277 294.73 200.729 294.593 201.056 294.318C201.383 294.043 201.546 293.669 201.546 293.196C201.546 292.633 201.383 292.19 201.056 291.868C200.729 291.541 200.277 291.378 199.7 291.378H196.148V294.73ZM196.148 289.929H199.018C199.468 289.929 199.853 289.867 200.175 289.744C200.497 289.616 200.744 289.436 200.914 289.204C201.089 288.968 201.177 288.688 201.177 288.366C201.177 287.907 200.985 287.547 200.602 287.287C200.218 287.022 199.69 286.889 199.018 286.889H196.148V289.929ZM208.998 296.52C208.307 296.52 207.68 296.39 207.116 296.129C206.553 295.864 206.105 295.483 205.774 294.986C205.442 294.484 205.277 293.878 205.277 293.168C205.277 292.543 205.4 292.036 205.646 291.648C205.892 291.255 206.221 290.947 206.633 290.724C207.045 290.502 207.5 290.336 207.997 290.227C208.499 290.114 209.003 290.024 209.51 289.957C210.172 289.872 210.71 289.808 211.122 289.766C211.538 289.718 211.842 289.64 212.031 289.531C212.225 289.422 212.322 289.233 212.322 288.963V288.906C212.322 288.205 212.13 287.661 211.747 287.273C211.368 286.884 210.793 286.69 210.021 286.69C209.221 286.69 208.593 286.865 208.139 287.216C207.684 287.566 207.365 287.94 207.18 288.338L205.589 287.77C205.873 287.107 206.252 286.591 206.725 286.222C207.204 285.847 207.725 285.587 208.288 285.44C208.856 285.289 209.415 285.213 209.964 285.213C210.315 285.213 210.717 285.256 211.172 285.341C211.631 285.421 212.074 285.589 212.5 285.845C212.931 286.101 213.288 286.487 213.572 287.003C213.856 287.519 213.998 288.21 213.998 289.077V296.264H212.322V294.787H212.237C212.123 295.024 211.934 295.277 211.669 295.547C211.404 295.817 211.051 296.046 210.61 296.236C210.17 296.425 209.633 296.52 208.998 296.52ZM209.254 295.014C209.917 295.014 210.475 294.884 210.93 294.624C211.389 294.363 211.735 294.027 211.967 293.615C212.204 293.203 212.322 292.77 212.322 292.315V290.781C212.251 290.866 212.095 290.945 211.853 291.016C211.617 291.082 211.342 291.141 211.029 291.193C210.722 291.24 210.421 291.283 210.127 291.321C209.839 291.354 209.604 291.383 209.424 291.406C208.989 291.463 208.582 291.555 208.203 291.683C207.829 291.806 207.526 291.993 207.294 292.244C207.066 292.49 206.953 292.827 206.953 293.253C206.953 293.835 207.168 294.275 207.599 294.574C208.035 294.867 208.586 295.014 209.254 295.014ZM217.058 300.355V285.355H218.677V287.088H218.876C218.999 286.899 219.169 286.657 219.387 286.364C219.61 286.065 219.927 285.8 220.339 285.568C220.755 285.331 221.319 285.213 222.029 285.213C222.948 285.213 223.757 285.443 224.458 285.902C225.159 286.361 225.706 287.012 226.099 287.855C226.492 288.698 226.688 289.692 226.688 290.838C226.688 291.993 226.492 292.995 226.099 293.842C225.706 294.685 225.161 295.338 224.465 295.802C223.769 296.262 222.967 296.491 222.058 296.491C221.357 296.491 220.796 296.375 220.374 296.143C219.953 295.907 219.629 295.639 219.401 295.341C219.174 295.038 218.999 294.787 218.876 294.588H218.734V300.355H217.058ZM218.705 290.81C218.705 291.633 218.826 292.36 219.067 292.99C219.309 293.615 219.662 294.105 220.126 294.46C220.59 294.811 221.158 294.986 221.83 294.986C222.531 294.986 223.116 294.801 223.585 294.432C224.058 294.058 224.413 293.556 224.65 292.926C224.891 292.292 225.012 291.586 225.012 290.81C225.012 290.043 224.894 289.351 224.657 288.736C224.425 288.115 224.072 287.625 223.599 287.266C223.13 286.901 222.54 286.719 221.83 286.719C221.148 286.719 220.576 286.891 220.112 287.237C219.647 287.578 219.297 288.056 219.06 288.672C218.824 289.283 218.705 289.995 218.705 290.81ZM230.921 293.793L236.177 285.355H238.109V296.264H236.433V287.827L231.205 296.264H229.245V285.355H230.921V293.793ZM239.694 286.918V285.355H248.558V286.918H244.978V296.264H243.302V286.918H239.694ZM255.01 296.491C253.959 296.491 253.052 296.259 252.29 295.795C251.533 295.327 250.948 294.673 250.536 293.835C250.129 292.992 249.925 292.012 249.925 290.895C249.925 289.777 250.129 288.793 250.536 287.94C250.948 287.083 251.521 286.416 252.255 285.937C252.993 285.454 253.855 285.213 254.84 285.213C255.408 285.213 255.969 285.308 256.523 285.497C257.077 285.686 257.581 285.994 258.036 286.42C258.49 286.842 258.853 287.4 259.123 288.097C259.392 288.793 259.527 289.65 259.527 290.668V291.378H251.118V289.929H257.823C257.823 289.313 257.7 288.764 257.453 288.281C257.212 287.798 256.866 287.417 256.417 287.138C255.971 286.858 255.446 286.719 254.84 286.719C254.172 286.719 253.595 286.884 253.107 287.216C252.624 287.543 252.252 287.969 251.992 288.494C251.731 289.02 251.601 289.583 251.601 290.185V291.15C251.601 291.974 251.743 292.673 252.027 293.246C252.316 293.814 252.716 294.247 253.228 294.545C253.739 294.839 254.333 294.986 255.01 294.986C255.451 294.986 255.848 294.924 256.203 294.801C256.563 294.673 256.873 294.484 257.134 294.233C257.394 293.977 257.596 293.66 257.738 293.281L259.357 293.736C259.186 294.285 258.9 294.768 258.498 295.185C258.095 295.597 257.598 295.918 257.006 296.15C256.414 296.378 255.749 296.491 255.01 296.491ZM261.111 296.264V294.702H261.509C261.836 294.702 262.108 294.638 262.326 294.51C262.543 294.377 262.719 294.148 262.851 293.821C262.989 293.49 263.093 293.03 263.164 292.443C263.239 291.851 263.294 291.098 263.327 290.185L263.526 285.355H270.799V296.264H269.123V286.918H265.117L264.946 290.81C264.908 291.704 264.828 292.493 264.705 293.175C264.587 293.852 264.404 294.42 264.158 294.879C263.917 295.338 263.595 295.684 263.192 295.916C262.79 296.148 262.285 296.264 261.679 296.264H261.111ZM275.323 289.304H278.448C279.726 289.304 280.704 289.628 281.381 290.277C282.058 290.926 282.397 291.747 282.397 292.741C282.397 293.395 282.245 293.989 281.942 294.524C281.639 295.054 281.194 295.478 280.607 295.795C280.02 296.108 279.3 296.264 278.448 296.264H273.874V285.355H275.55V294.702H278.448C279.111 294.702 279.655 294.526 280.081 294.176C280.507 293.826 280.721 293.376 280.721 292.827C280.721 292.249 280.507 291.778 280.081 291.413C279.655 291.049 279.111 290.866 278.448 290.866H275.323V289.304ZM292.249 290.043V291.605H286.227V290.043H292.249ZM286.624 285.355V296.264H284.948V285.355H286.624ZM293.528 285.355V296.264H291.852V285.355H293.528ZM298.038 289.304H301.163C302.441 289.304 303.419 289.628 304.096 290.277C304.773 290.926 305.112 291.747 305.112 292.741C305.112 293.395 304.96 293.989 304.657 294.524C304.354 295.054 303.909 295.478 303.322 295.795C302.735 296.108 302.015 296.264 301.163 296.264H296.589V285.355H298.265V294.702H301.163C301.826 294.702 302.37 294.526 302.796 294.176C303.222 293.826 303.435 293.376 303.435 292.827C303.435 292.249 303.222 291.778 302.796 291.413C302.37 291.049 301.826 290.866 301.163 290.866H298.038V289.304ZM306.844 296.264V285.355H308.521V296.264H306.844ZM313.265 293.793L318.521 285.355H320.452V296.264H318.776V287.827L313.549 296.264H311.589V285.355H313.265V293.793ZM317.413 281.719H318.975C318.975 282.486 318.71 283.113 318.18 283.601C317.649 284.088 316.93 284.332 316.021 284.332C315.126 284.332 314.413 284.088 313.883 283.601C313.357 283.113 313.094 282.486 313.094 281.719H314.657C314.657 282.088 314.759 282.412 314.962 282.692C315.171 282.971 315.523 283.111 316.021 283.111C316.518 283.111 316.873 282.971 317.086 282.692C317.304 282.412 317.413 282.088 317.413 281.719ZM329.147 296.264V285.355H337.727V296.264H336.051V286.918H330.824V296.264H329.147ZM340.788 300.355V285.355H342.407V287.088H342.606C342.729 286.899 342.9 286.657 343.118 286.364C343.34 286.065 343.657 285.8 344.069 285.568C344.486 285.331 345.049 285.213 345.76 285.213C346.678 285.213 347.488 285.443 348.189 285.902C348.889 286.361 349.436 287.012 349.829 287.855C350.222 288.698 350.419 289.692 350.419 290.838C350.419 291.993 350.222 292.995 349.829 293.842C349.436 294.685 348.892 295.338 348.196 295.802C347.5 296.262 346.697 296.491 345.788 296.491C345.087 296.491 344.526 296.375 344.105 296.143C343.683 295.907 343.359 295.639 343.132 295.341C342.904 295.038 342.729 294.787 342.606 294.588H342.464V300.355H340.788ZM342.436 290.81C342.436 291.633 342.556 292.36 342.798 292.99C343.039 293.615 343.392 294.105 343.856 294.46C344.32 294.811 344.888 294.986 345.561 294.986C346.261 294.986 346.846 294.801 347.315 294.432C347.788 294.058 348.144 293.556 348.38 292.926C348.622 292.292 348.743 291.586 348.743 290.81C348.743 290.043 348.624 289.351 348.387 288.736C348.155 288.115 347.803 287.625 347.329 287.266C346.86 286.901 346.271 286.719 345.561 286.719C344.879 286.719 344.306 286.891 343.842 287.237C343.378 287.578 343.028 288.056 342.791 288.672C342.554 289.283 342.436 289.995 342.436 290.81ZM357.407 296.491C356.422 296.491 355.558 296.257 354.815 295.788C354.076 295.32 353.499 294.664 353.082 293.821C352.67 292.978 352.464 291.993 352.464 290.866C352.464 289.73 352.67 288.738 353.082 287.891C353.499 287.043 354.076 286.385 354.815 285.916C355.558 285.447 356.422 285.213 357.407 285.213C358.392 285.213 359.254 285.447 359.993 285.916C360.736 286.385 361.314 287.043 361.725 287.891C362.142 288.738 362.35 289.73 362.35 290.866C362.35 291.993 362.142 292.978 361.725 293.821C361.314 294.664 360.736 295.32 359.993 295.788C359.254 296.257 358.392 296.491 357.407 296.491ZM357.407 294.986C358.155 294.986 358.771 294.794 359.254 294.41C359.737 294.027 360.094 293.523 360.326 292.898C360.558 292.273 360.674 291.596 360.674 290.866C360.674 290.137 360.558 289.458 360.326 288.828C360.094 288.198 359.737 287.689 359.254 287.301C358.771 286.913 358.155 286.719 357.407 286.719C356.659 286.719 356.044 286.913 355.561 287.301C355.078 287.689 354.72 288.198 354.488 288.828C354.256 289.458 354.14 290.137 354.14 290.866C354.14 291.596 354.256 292.273 354.488 292.898C354.72 293.523 355.078 294.027 355.561 294.41C356.044 294.794 356.659 294.986 357.407 294.986ZM369.341 296.491C368.318 296.491 367.438 296.25 366.699 295.767C365.96 295.284 365.392 294.619 364.994 293.771C364.597 292.924 364.398 291.955 364.398 290.866C364.398 289.758 364.601 288.781 365.009 287.933C365.42 287.081 365.993 286.416 366.727 285.937C367.466 285.454 368.328 285.213 369.312 285.213C370.08 285.213 370.771 285.355 371.386 285.639C372.002 285.923 372.506 286.321 372.899 286.832C373.292 287.344 373.536 287.94 373.631 288.622H371.955C371.827 288.125 371.543 287.685 371.102 287.301C370.667 286.913 370.08 286.719 369.341 286.719C368.688 286.719 368.115 286.889 367.622 287.23C367.134 287.566 366.753 288.042 366.479 288.658C366.209 289.268 366.074 289.986 366.074 290.81C366.074 291.652 366.206 292.386 366.472 293.011C366.741 293.636 367.12 294.122 367.608 294.467C368.1 294.813 368.678 294.986 369.341 294.986C369.777 294.986 370.172 294.91 370.527 294.758C370.882 294.607 371.183 294.389 371.429 294.105C371.675 293.821 371.85 293.48 371.955 293.082H373.631C373.536 293.726 373.302 294.306 372.928 294.822C372.558 295.334 372.068 295.741 371.457 296.044C370.851 296.342 370.146 296.491 369.341 296.491ZM382.047 293.991L385.854 285.355H387.445L382.729 296.264H381.365L376.734 285.355H378.297L382.047 293.991ZM377.757 285.355V296.264H376.081V285.355H377.757ZM386.337 296.264V285.355H388.013V296.264H386.337ZM395.513 296.491C394.528 296.491 393.664 296.257 392.92 295.788C392.182 295.32 391.604 294.664 391.188 293.821C390.776 292.978 390.57 291.993 390.57 290.866C390.57 289.73 390.776 288.738 391.188 287.891C391.604 287.043 392.182 286.385 392.92 285.916C393.664 285.447 394.528 285.213 395.513 285.213C396.498 285.213 397.359 285.447 398.098 285.916C398.841 286.385 399.419 287.043 399.831 287.891C400.248 288.738 400.456 289.73 400.456 290.866C400.456 291.993 400.248 292.978 399.831 293.821C399.419 294.664 398.841 295.32 398.098 295.788C397.359 296.257 396.498 296.491 395.513 296.491ZM395.513 294.986C396.261 294.986 396.876 294.794 397.359 294.41C397.842 294.027 398.2 293.523 398.432 292.898C398.664 292.273 398.78 291.596 398.78 290.866C398.78 290.137 398.664 289.458 398.432 288.828C398.2 288.198 397.842 287.689 397.359 287.301C396.876 286.913 396.261 286.719 395.513 286.719C394.765 286.719 394.149 286.913 393.666 287.301C393.183 287.689 392.826 288.198 392.594 288.828C392.362 289.458 392.246 290.137 392.246 290.866C392.246 291.596 392.362 292.273 392.594 292.898C392.826 293.523 393.183 294.027 393.666 294.41C394.149 294.794 394.765 294.986 395.513 294.986ZM401.589 286.918V285.355H410.452V286.918H406.873V296.264H405.197V286.918H401.589ZM412.897 300.355V285.355H414.517V287.088H414.716C414.839 286.899 415.009 286.657 415.227 286.364C415.449 286.065 415.767 285.8 416.179 285.568C416.595 285.331 417.159 285.213 417.869 285.213C418.788 285.213 419.597 285.443 420.298 285.902C420.999 286.361 421.546 287.012 421.939 287.855C422.332 288.698 422.528 289.692 422.528 290.838C422.528 291.993 422.332 292.995 421.939 293.842C421.546 294.685 421.001 295.338 420.305 295.802C419.609 296.262 418.806 296.491 417.897 296.491C417.197 296.491 416.636 296.375 416.214 296.143C415.793 295.907 415.468 295.639 415.241 295.341C415.014 295.038 414.839 294.787 414.716 294.588H414.574V300.355H412.897ZM414.545 290.81C414.545 291.633 414.666 292.36 414.907 292.99C415.149 293.615 415.502 294.105 415.966 294.46C416.43 294.811 416.998 294.986 417.67 294.986C418.371 294.986 418.956 294.801 419.424 294.432C419.898 294.058 420.253 293.556 420.49 292.926C420.731 292.292 420.852 291.586 420.852 290.81C420.852 290.043 420.734 289.351 420.497 288.736C420.265 288.115 419.912 287.625 419.439 287.266C418.97 286.901 418.38 286.719 417.67 286.719C416.988 286.719 416.415 286.891 415.951 287.237C415.487 287.578 415.137 288.056 414.9 288.672C414.663 289.283 414.545 289.995 414.545 290.81ZM430.71 296.264V285.355H435.17C436.344 285.355 437.277 285.62 437.968 286.15C438.66 286.681 439.005 287.382 439.005 288.253C439.005 288.916 438.809 289.429 438.416 289.794C438.023 290.154 437.519 290.398 436.903 290.525C437.306 290.582 437.696 290.724 438.075 290.952C438.458 291.179 438.776 291.491 439.027 291.889C439.278 292.282 439.403 292.765 439.403 293.338C439.403 293.897 439.261 294.396 438.977 294.837C438.693 295.277 438.286 295.625 437.755 295.881C437.225 296.136 436.591 296.264 435.852 296.264H430.71ZM432.301 294.73H435.852C436.43 294.73 436.882 294.593 437.208 294.318C437.535 294.043 437.699 293.669 437.699 293.196C437.699 292.633 437.535 292.19 437.208 291.868C436.882 291.541 436.43 291.378 435.852 291.378H432.301V294.73ZM432.301 289.929H435.17C435.62 289.929 436.006 289.867 436.328 289.744C436.65 289.616 436.896 289.436 437.066 289.204C437.242 288.968 437.329 288.688 437.329 288.366C437.329 287.907 437.137 287.547 436.754 287.287C436.37 287.022 435.842 286.889 435.17 286.889H432.301V289.929ZM455.662 281.264L456.514 282.287C456.183 282.609 455.799 282.834 455.364 282.962C454.928 283.089 454.436 283.168 453.886 283.196C453.337 283.224 452.726 283.253 452.054 283.281C451.296 283.31 450.669 283.494 450.172 283.835C449.675 284.176 449.291 284.668 449.021 285.312C448.751 285.956 448.579 286.747 448.503 287.685H448.645C449.014 287.003 449.526 286.501 450.179 286.179C450.832 285.857 451.533 285.696 452.281 285.696C453.134 285.696 453.901 285.895 454.582 286.293C455.264 286.69 455.804 287.28 456.202 288.061C456.599 288.842 456.798 289.806 456.798 290.952C456.798 292.093 456.595 293.078 456.188 293.906C455.785 294.735 455.219 295.374 454.49 295.824C453.766 296.269 452.916 296.491 451.94 296.491C450.965 296.491 450.11 296.262 449.376 295.802C448.643 295.338 448.072 294.652 447.665 293.743C447.258 292.829 447.054 291.7 447.054 290.355V289.19C447.054 286.761 447.466 284.919 448.29 283.665C449.118 282.41 450.364 281.761 452.026 281.719C452.613 281.7 453.136 281.695 453.595 281.704C454.054 281.714 454.455 281.693 454.795 281.641C455.136 281.588 455.425 281.463 455.662 281.264ZM451.94 294.986C452.598 294.986 453.164 294.82 453.638 294.489C454.116 294.157 454.483 293.691 454.739 293.089C454.994 292.483 455.122 291.771 455.122 290.952C455.122 290.156 454.992 289.479 454.732 288.92C454.476 288.362 454.109 287.936 453.631 287.642C453.152 287.348 452.58 287.202 451.912 287.202C451.424 287.202 450.986 287.284 450.598 287.45C450.21 287.616 449.878 287.86 449.604 288.182C449.329 288.504 449.116 288.897 448.964 289.361C448.818 289.825 448.74 290.355 448.73 290.952C448.73 292.173 449.017 293.151 449.589 293.885C450.162 294.619 450.946 294.986 451.94 294.986ZM463.794 296.491C462.809 296.491 461.945 296.257 461.202 295.788C460.463 295.32 459.885 294.664 459.469 293.821C459.057 292.978 458.851 291.993 458.851 290.866C458.851 289.73 459.057 288.738 459.469 287.891C459.885 287.043 460.463 286.385 461.202 285.916C461.945 285.447 462.809 285.213 463.794 285.213C464.779 285.213 465.641 285.447 466.379 285.916C467.123 286.385 467.7 287.043 468.112 287.891C468.529 288.738 468.737 289.73 468.737 290.866C468.737 291.993 468.529 292.978 468.112 293.821C467.7 294.664 467.123 295.32 466.379 295.788C465.641 296.257 464.779 296.491 463.794 296.491ZM463.794 294.986C464.542 294.986 465.158 294.794 465.641 294.41C466.124 294.027 466.481 293.523 466.713 292.898C466.945 292.273 467.061 291.596 467.061 290.866C467.061 290.137 466.945 289.458 466.713 288.828C466.481 288.198 466.124 287.689 465.641 287.301C465.158 286.913 464.542 286.719 463.794 286.719C463.046 286.719 462.43 286.913 461.947 287.301C461.464 287.689 461.107 288.198 460.875 288.828C460.643 289.458 460.527 290.137 460.527 290.866C460.527 291.596 460.643 292.273 460.875 292.898C461.107 293.523 461.464 294.027 461.947 294.41C462.43 294.794 463.046 294.986 463.794 294.986ZM469.87 286.918V285.355H478.734V286.918H475.154V296.264H473.478V286.918H469.87ZM485.186 296.491C484.135 296.491 483.228 296.259 482.466 295.795C481.708 295.327 481.124 294.673 480.712 293.835C480.304 292.992 480.101 292.012 480.101 290.895C480.101 289.777 480.304 288.793 480.712 287.94C481.124 287.083 481.696 286.416 482.43 285.937C483.169 285.454 484.031 285.213 485.016 285.213C485.584 285.213 486.145 285.308 486.699 285.497C487.253 285.686 487.757 285.994 488.212 286.42C488.666 286.842 489.028 287.4 489.298 288.097C489.568 288.793 489.703 289.65 489.703 290.668V291.378H481.294V289.929H487.999C487.999 289.313 487.875 288.764 487.629 288.281C487.388 287.798 487.042 287.417 486.592 287.138C486.147 286.858 485.622 286.719 485.016 286.719C484.348 286.719 483.77 286.884 483.283 287.216C482.8 287.543 482.428 287.969 482.168 288.494C481.907 289.02 481.777 289.583 481.777 290.185V291.15C481.777 291.974 481.919 292.673 482.203 293.246C482.492 293.814 482.892 294.247 483.403 294.545C483.915 294.839 484.509 294.986 485.186 294.986C485.626 294.986 486.024 294.924 486.379 294.801C486.739 294.673 487.049 294.484 487.31 294.233C487.57 293.977 487.771 293.66 487.913 293.281L489.533 293.736C489.362 294.285 489.076 294.768 488.673 295.185C488.271 295.597 487.774 295.918 487.182 296.15C486.59 296.378 485.925 296.491 485.186 296.491Z" fill="#97989A"/>
                        </svg>

                    </div>
                    <div className="">
                        <form onSubmit={handleSubmit(submit)}>
                            <div className="flex flex-col gap-[9px]">
                                <FileUpload svgIcon={uploadImage} className="cursor-pointer"/>
                                <input {...register("name", {required:true})} type="text" placeholder="Название*" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                <input {...register("description")} type="text" placeholder="Описание мероприятия" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                <input {...register("organizer", {required:true})} type="text" placeholder="Организатор*" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                <input {...register("contacts", {required:true})} type="text" placeholder="Контакты*" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                <input {...register("places", {required:true})} type="number" placeholder="Количество мест*" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                {/* <input {...register("free_places", {required:true})} type="number" placeholder="Свободные места*" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/> */}
                                <label className="w-[50%]">
                                    <Controller
                                        control={control}
                                        name='datetime_start'
                                        render={() => (
                                        <DatePicker
                                            showIcon
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="DD/MM/YYYY HH:mm"
                                            icon={
                                                <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="26" height="26" rx="7" transform="matrix(-1 0 0 1 26.8887 0)" fill="#9AA8B0"/>
                                                    <rect width="2.2807" height="13.2281" rx="1.14035" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 23.1553 9.35938)" fill="white"/>
                                                    <rect x="4.43457" y="9.35938" width="2.2807" height="13.2281" rx="1.14035" transform="rotate(-45 4.43457 9.35938)" fill="white"/>
                                                </svg>
                                            }
                                            placeholderText="Дата начала*"
                                            className="bg-[#EBEBEB] rounded-md w-[274px] pl-[300px]"
                                        />
                                        )}
                                    />                           
                                </label>
                                <label className="w-[50%]">
                                    <Controller
                                        control={control}
                                        name='datetime_end'
                                        render={() => (
                                        <DatePicker
                                            showIcon
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="DD/MM/YYYY HH:mm"
                                            icon={
                                                <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="26" height="26" rx="7" transform="matrix(-1 0 0 1 26.8887 0)" fill="#9AA8B0"/>
                                                    <rect width="2.2807" height="13.2281" rx="1.14035" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 23.1553 9.35938)" fill="white"/>
                                                    <rect x="4.43457" y="9.35938" width="2.2807" height="13.2281" rx="1.14035" transform="rotate(-45 4.43457 9.35938)" fill="white"/>
                                                </svg>
                                            }
                                            placeholderText="Дата начала*"
                                            className="bg-[#EBEBEB] rounded-md w-[274px] pl-[300px]"
                                        />
                                        )}
                                    />                           
                                </label>
                                <input {...register("address")} type="text" placeholder="Адрес проведения" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                <CustomCheckbox label="Конкурс (необходима отправка работы)"/>
                                <CustomCheckbox label="Создать рассылку после публикации" id="notification"/>

                                <div className="flex justify-between pb-[40px] mt-[41px] items-center">
                                    <button onClick={() => navigate('/')} className="bg-[#D0D4D9] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[134px] text-center border-[1px] hover:border-gray-700">
                                        Отмена                               
                                    </button>
                                    <button type="submit" className="bg-[#9AA8B0] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[202px] text-center border-[1px] hover:border-gray-700">
                                        Сохранить                                
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                
            
            <Footer/>
        </div>
    );
}

export default CreateEvent;