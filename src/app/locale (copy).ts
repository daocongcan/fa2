import { Injectable } from '@angular/core';

@Injectable()
export class Locale {
  CONGRATULATION = 'Félicitation';
  SORRY = 'Pardon';
  YES = 'Oui';
  NO = 'Non';

  NULL = ""

  CANCLE = 'Annuler';
  ARE_YOU_SURE = 'Êtes-vous sûr?';
  NAME_IS_REQUIRED = 'Le nom est requis';
  PRICE_IS_REQUIRED = 'Le prix est requis';
  DATE_IS_REQUIRED = 'Le date est requis';
  AVAILABLE_AREA_IS_REQUIRED = 'La zone disponible est requise';
  LATITUDE_IS_REQUIRED = 'La latitude est requise';
  LONGITUDE_IS_REQUIRED = 'La longitude est requise';
  RENTED_IS_REQUIRED = 'La loue est requise';
  MAX_RADIUS_IS_REQUIRED = 'La rayon maximum est requise';
  REF_CLIENT_IS_REQUIRED = 'Le client ref est requis';
  PHONE_IS_REQUIRED = 'Le numéro de téléphone est requis';
  TAX_IS_REQUIRED = 'Le numéro de taxe est requis';
  EMAIL_IS_REQUIRED = 'Le courriel est requis';
  ADDRESS_IS_REQUIRED = 'L\'adresse est requise';
  AREA_IS_REQUIRED = 'La zone est requise';

  EMAIL_INVALID = 'Le courriel est invalide';
  LATITUDE_LONGITUDE_INVALID = 'La latitude ou la longitude est invalide';

  ADD_NEW_PRODUCT_SUCCESSFULLY = 'Ajouter un nouveau produit avec succès';
  ADD_NEW_PRODUCT_FAILED = 'Ajouter un produit a échoué';
  EDIT_PRODUCT_SUCCESSFULLY = 'Le produit a été modifié avec succès';
  EDIT_PRODUCT_FAIL = 'Le produit a été modifié échoué';
  NO_DEVICE_FOUND = 'Je n\'ai aucun appareil'; // don't have any device
  REQUEST_ADD_NEW_DEVICE = 'Veuillez ajouter un appareil pour ce produit';

  ADD_NEW_COMPANY_SUCCESSFULLY = 'Ajouter un nouveau compagnie avec succès';
  ADD_NEW_COMPANY_FAILED = 'Ajouter un compagnie a échoué';
  EDIT_COMPANY_SUCCESSFULLY = 'Modifier la société avec succès';
  EDIT_COMPANY_FAILED = 'Modifier la société a échoué';

  ADD_NEW_PRODUCT_TYPE_SUCCESSFULLY = 'Ajouter un nouveau type de produit avec succès';
  ADD_NEW_PRODUCT_TYPE_FAIL = 'Ajouter un nouveau type de produit échoue';
  EDIT_PRODUCT_TYPE_SUCCESSFULLY = 'Mettre à jour le nouveau type de produit avec succès';
  EDIT_PRODUCT_TYPE_FAIL = 'Mettre à jour le nouveau type de produit échouer';

  WARNING_NOT_RETURN_AFTER_REMOVE = ' ne pourra pas revenir après la suppression.';
  REMOVE_SUCCESSFULLY = ' a été supprimé avec succès'; // has been successfully removed
  REMOVE_FAIL = ' n\'a pas été retiré';

  ADD_NEW_STORAGE_SUCCESSFULLY = 'Ajouter un nouveau stockage avec succès';
  ADD_NEW_STORAGE_FAILED = 'Ajouter un stockage a échoué';
  EDIT_STORAGE_SUCCESSFULLY = 'Mettre à jour le stockage';
  EDIT_STORAGE_FAIL = 'Echec du stockage de mise à';

  ADD_NEW_SITE_SUCCESSFULLY = 'Ajouter un nouveau site avec succès';
  ADD_NEW_SITE_FAILED = 'Ajouter un site a échoué';
  EDIT_SITE_SUCCESSFULLY = 'Mettre à jour le site';
  EDIT_SITE_FAIL = 'Echec du site de mise à';

  LATITUDE_NOT_VALID = 'La latitude n\'est pas valide';
  LONGITUDE_NOT_VALID = 'La longitude n\'est pas valide';
}
