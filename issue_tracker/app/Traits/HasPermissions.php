<?php
namespace App\Traits;
use App\Permission;

trait HasPermissions {
    // public function permissions()
    // {
    //     return $this->belongsToMany(Permission::class, 'users_permissions');
    // }
    public function hasPermission(...$permissions){
        return $this->permissions()->whereIn('slug',$permissions)->count() || 
        $this->roles()->whereHas('permissions',function($q) use($permissions) {
            $q->whereIn('slug',$permissions);
        })->count();
    }

    private function getPermissionsIdsBySlug($permissions){
        return Permission::whereIn('slug',$permissions)->pluck('id')->toArray();
    }
    public function givePermissionsTo(...$permissions){

        $permissionIds = 
        $this->permissions()->attach($this->getPermissionsIdsBySlug($permissions));
    }

    public function setPermissionsTo(...$permissions){
        $this->permissions()->sync($this->getPermissionsIdsBySlug($permissions));
    }

    public function detachPermissions(...$permissions){
        $this->permissions()->detach($$this->getPermissionsIdsBySlug($permissions));

    }
} 