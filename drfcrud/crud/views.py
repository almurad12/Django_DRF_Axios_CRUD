from functools import partial
from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Person
from .serializers import PersonSerializer
from rest_framework import status
@api_view(['GET','POST','PUT','PATCH','DELETE'])
def crud(request):
    if  request.method == 'GET':
        obj = Person.objects.all()
        serializer = PersonSerializer(obj,many=True) 
        return Response(serializer.data)
    elif request.method=="POST":
        data = request.data
        print("data is",data)
        serializer = PersonSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method =="PUT":
        data = request.data
        obj = Person.objects.get(id=data['id'])
        serializer=PersonSerializer(obj,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error)
    elif request.method == "PATCH":
        data = request.data
        obj= Person.objects.get(id=data['id'])
        serializer=PersonSerializer(obj,data=data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error)
    else:
        data= request.data
        obj = Person.objects.get(id=data['id'])
        obj.delete()
        return Response ({"message":"Person data deleted successfully"})

@api_view(["GET",'PUT','DELETE'])
def crudupdate(request,pk):
    # if request.method=="GET":
    #    obj = Person.objects.get(pk=pk)
    #    serializer= PersonSerializer(obj,data=request.data)
    #    if serializer.is_valid():
    #         return response (serializer.data)
    #    else:
    #         return Response(serializer.errors)
    if request.method=="PUT":
        obj = Person.objects.get(pk=pk)
        serializer =PersonSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    else:
        data= request.data
        obj = Person.objects.get(pk=pk)
        obj.delete()
        return Response ({"message":"Person data deleted successfully"})

def show(request):
    return render(request,"index.html")