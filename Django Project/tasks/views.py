from django.shortcuts import render
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

def task_list(request):
    tasks = Task.objects.all()
    
    if request.method == "POST":
        # Create a new task
        title = request.POST.get('title')
        task = Task.objects.create(title=title)
        # RETURN ONLY THE PARTIAL for the new item
        return render(request, 'tasks/partials/task_item.html', {'task': task})

    return render(request, 'tasks/index.html', {'tasks': tasks})

@csrf_exempt # Temporary bypass for testing
def delete_task(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()
    return HttpResponse("") # Return empty so HTMX removes the element