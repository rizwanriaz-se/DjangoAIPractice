from django.shortcuts import render, get_object_or_404
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import json

def task_list(request):
    tasks = Task.objects.all()
    total_tasks = tasks.count()
    completed_tasks = tasks.filter(completed=True).count()
    
    if request.method == "POST":
        # Create a new task
        title = request.POST.get('title')
        task = Task.objects.create(title=title)
        # RETURN ONLY THE PARTIAL for the new item
        return render(request, 'tasks/partials/task_item.html', {'task': task})

    return render(request, 'tasks/index.html', {'tasks': tasks, 'total_tasks': total_tasks, 'completed_tasks': completed_tasks})

@csrf_exempt
def update_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if request.method == "PUT":
        data = json.loads(request.body)
        task.title = data.get('title', task.title)
        task.completed = data.get('completed', task.completed)
        task.save()
        return JsonResponse({'status': 'ok'})
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt # Temporary bypass for testing
def delete_task(request, pk):
    task = Task.objects.get(pk=pk)
    task.delete()
    return HttpResponse("") # Return empty so HTMX removes the element